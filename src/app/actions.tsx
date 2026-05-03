'use server';

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { Resend } from 'resend';

const TURNSTILE_SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
const CAL_API_URL = 'https://api.cal.com/v2';
const API_KEY = process.env.CAL_API_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function getAvailableSlots(eventTypeId: number, startTime: string, endTime: string) {
  const url = `https://api.cal.com/v2/slots/available?eventTypeId=${eventTypeId}&startTime=${startTime}&endTime=${endTime}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'cal-api-version': '2024-06-11'
    },
  });

  const json = await response.json();

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
      end: new Date(new Date(payload.start).getTime() + 60 * 60000).toISOString(),
      timeZone: "America/New_York",
      language: "en"
    }),
  });

  const result = await response.json();
  return result;
}

// Called after email verification succeeds — stores verified email only
export async function subscribeUser(email: string) {
  if (!email || !email.includes('@')) {
    return { error: 'Invalid entry. Email required.' };
  }

  try {
    const [local, domain] = email.split('@');
    const timestamp = new Date().toISOString();
    
    const existingLead = await prisma.email_submissions.findFirst({
      where: {
        email_local: local,
        email_domain: domain,
      },
    });

    if (existingLead) {
      return { success: true };
    }

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
  company: string;
  vectors: string[];
}) {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  const payment_amt = 250;

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("MISSING_ENV_VAR: STRIPE_SECRET_KEY is undefined.");
    }

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: payment_amt * 100,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      receipt_email: data.email,
      metadata: {
        customer_email: data.email,
        scheduled_slot: data.slot,
        customer_name: data.name,
        customer_company: data.company,
        help_areas: data.vectors.join(', '),
      },
    });

    console.log("-----------------------------------------");
    console.log("[STRIPE_SUCCESS]: Intent Created ->", paymentIntent.id);
    console.log("-----------------------------------------");

    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("GATEWAY EXECUTION ERROR");
    console.log("Message:", error.message);
    console.log("Code:", error.code);
    console.log("Type:", error.type);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");

    throw new Error(error.message || "Stripe initialization failed.");
  }
}

export async function sendVerificationCode(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  await prisma.email_verifications.create({
    data: {
      email,
      code,
      expires_at: new Date(Date.now() + 10 * 60 * 1000)
    }
  });

  await resend.emails.send({
    from: 'support@studiophoenix.ink',
    to: email,
    subject: 'Your Studio Phoenix verification code',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; background: #0D0D0D; color: #ffffff; padding: 40px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <img src="https://vector.studiophoenix.ink/images/branding/logo_full_english.svg" alt="Studio Phoenix" style="width: 120px; margin-bottom: 32px;" />
        <h2 style="font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; margin-bottom: 16px;">Check Your Inbox</h2>
        </div>
        <p style="color: #8A8986; font-size: 14px; margin-bottom: 32px;">Your verification code for Studio Phoenix:</p>
        <div style="background: #000; border: 1px solid rgba(255,255,255,0.1); padding: 24px; text-align: center; margin-bottom: 32px;">
          <span style="font-size: 36px; font-weight: 900; letter-spacing: 0.3em; color: #F29801;">${code}</span>
        </div>
        <p style="color: #8A8986; font-size: 12px;">Expires in 10 minutes. If you didn't request this, you can safely ignore it.</p>
      </div>
    `
  });

  return { success: true };
}

export async function verifyCode(email: string, code: string) {
  const record = await prisma.email_verifications.findFirst({
    where: {
      email,
      code,
      expires_at: { gt: new Date() }
    }
  });

  if (!record) return { success: false, error: 'Invalid or expired code.' };

  await prisma.email_verifications.delete({ where: { verification_id: record.verification_id } });

  return { success: true };
}
