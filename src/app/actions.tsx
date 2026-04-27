'use server';

import { prisma } from '@/lib/prisma'; // Ensure this points to prisma.ts file
import Stripe from 'stripe';

const TURNSTILE_SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY; //for cloudflare bot checking

//for calendar booking
const CAL_API_URL = 'https://api.cal.com/v2';
const API_KEY = process.env.CAL_API_KEY;

export async function getAvailableSlots(eventTypeId: number, startTime: string, endTime: string) {
  // v2 Endpoint: Note the /v2/ and the /slots/available path
  const url = `https://api.cal.com/v2/slots/available?eventTypeId=${eventTypeId}&startTime=${startTime}&endTime=${endTime}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'cal-api-version': '2024-06-11' // Optional: Pinning version if needed
    },
  });

  const json = await response.json();

  // v2 wraps everything in a "data" object. 
  // The "slots" object in v2 is often already keyed by date: { "2026-04-24": [...] }
  if (json.status === 'error') {
    throw new Error(json.message || 'Cal.com API Error');
  }

  return json.data.slots; 
}

export async function createBooking(payload: {
  eventTypeId: number;
  start: string;
  name: string;
  email: string;
  notes: string;
}) {
  const response = await fetch(`${CAL_API_URL}/bookings?apiKey=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      end: new Date(new Date(payload.start).getTime() + 30 * 60000).toISOString(), // Assume 30 min session
      timeZone: "America/New_York", // Or detect from user
      language: "en"
    }),
  });

  const result = await response.json();
  return result;
}

export async function subscribeUser(formData: FormData) {
  const email = formData.get('email') as string;
  const captchaToken = formData.get('cf-turnstile-response') as string;

  // 1. Validation check
  if (!email || !email.includes('@')) {
    return { error: 'Invalid entry. Email required.' };
  }

  // 2. Captcha Verification (The Gatekeeper)
  if (!captchaToken) {
    return { error: 'Security verification missing.' };
  }

  try {
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${TURNSTILE_SECRET_KEY}&response=${captchaToken}`,
      }
    );

    const verification = await verifyResponse.json();
    if (!verification.success) {
      return { error: 'Security verification failed. Bot detected.' };
    }

    // 2. Data Preparation
    const [local, domain] = email.split('@');
    const timestamp = new Date().toISOString();
    
    // 1. Deduplication Check
    // We look for an existing record with the same local and domain parts
    const existingLead = await prisma.email_submissions.findFirst({
      where: {
        email_local: local,
        email_domain: domain,
      },
    });

    // 2. If it exists, return success immediately without inserting
    if (existingLead) {
      return { success: true };
    }

    // 3. Database Insertion
    await prisma.email_submissions.create({
      data: {
        email_local: local,
        email_domain: domain,
        date_submit: timestamp,
      },
    });

    return { success: true };
  } catch (err) {
    console.error('Infrastructure Error:', err);
    return { error: 'Failed to initialize lead capture. Internal fire.' };
  }
}

export async function createPaymentIntent(data: {
  email: string;
  slot: string;
  name: string;
}) {
  // Ensure the key is read at the exact moment of the call
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || '');

  try {
    // 1. Validate the key exists before calling Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("MISSING_ENV_VAR: STRIPE_SECRET_KEY is undefined.");
    }

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: 25000, //250.00
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        customer_email: data.email,
        scheduled_slot: data.slot,
        customer_name: data.name
      },
    });

    // Log this to terminal to verify Stripe is responding
    console.log("-----------------------------------------");
    console.log("[STRIPE_SUCCESS]: Intent Created ->", paymentIntent.id);
    console.log("-----------------------------------------");

    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    // [LOUD LOGGING] This will stand out in your terminal
    console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("GATEWAY EXECUTION ERROR");
    console.log("Message:", error.message);
    console.log("Code:", error.code);
    console.log("Type:", error.type);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");

    // Pass the real message back to the modal so you can see it in the alert
    throw new Error(error.message || "Stripe initialization failed.");
  }
}