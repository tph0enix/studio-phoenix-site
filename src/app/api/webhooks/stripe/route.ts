'use server';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers(); 
  const sig = headersList.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`[WEBHOOK_ERROR]: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    const { 
      customer_email, 
      customer_name, 
      scheduled_slot,
      customer_company,
      help_areas
    } = paymentIntent.metadata;

    // 1. Create Cal.com booking
    try {
      const calResponse = await fetch('https://api.cal.com/v2/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CAL_API_KEY}`,
          'Content-Type': 'application/json',
          'cal-api-version': '2024-06-11'
        },
        body: JSON.stringify({
          eventTypeId: 5474611,
          start: scheduled_slot,
          responses: {
            name: customer_name,
            email: customer_email,
          },
          timeZone: "America/New_York",
          language: "en",
          metadata: { source: "Vector_Audit_Modal" }
        }),
      });
      const calData = await calResponse.json();
      console.log("[CAL_BOOKING_RESPONSE]:", JSON.stringify(calData, null, 2));
    } catch (error) {
      console.error("[CAL_BOOKING_FAILED]:", error);
    }

    // 2. Send summary email to Tristan
    try {
      const slotFormatted = new Date(scheduled_slot).toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/New_York',
        timeZoneName: 'short'
      });

      await resend.emails.send({
        from: 'support@studiophoenix.ink',
        to: 'tristan.storm.phoenix@studiophoenix.ink',
        subject: `New Booking: ${customer_name} — ${slotFormatted}`,
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; background: #0D0D0D; color: #ffffff; padding: 40px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="https://vector.studiophoenix.ink/images/branding/logo_full_english.svg" alt="Studio Phoenix" style="width: 120px; margin-bottom: 32px;" />
            </div>
            <h2 style="font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; margin-bottom: 24px; color: #F29801;">New Discovery Call Booked</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #8A8986; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; font-weight: bold;">${customer_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #8A8986; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px;">${customer_email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #8A8986; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px;">${customer_company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #8A8986; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Session</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px;">${slotFormatted}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #8A8986; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Help Needed</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; color: #F29801;">${help_areas || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #8A8986; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Amount Paid</td>
                <td style="padding: 10px 0; font-size: 13px; color: #13A940; font-weight: bold;">$250.00</td>
              </tr>
            </table>
          </div>
        `
      });
      console.log("[SUMMARY_EMAIL_SENT]");
    } catch (error) {
      console.error("[SUMMARY_EMAIL_FAILED]:", error);
    }
  }

  return NextResponse.json({ received: true });
}
