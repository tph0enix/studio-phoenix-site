import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers(); 
  const sig = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    // Verifying that this ping ACTUALLY came from Stripe
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`[WEBHOOK_ERROR]: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Listening specifically for the successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    // Pulling the metadata we saved in the AuditModal
    const { customer_email, customer_name, scheduled_slot } = paymentIntent.metadata;

    try {
      // Final Step: Creating the actual Cal.com booking
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
          timeZone: "America/New_York", // Or detect from metadata
          language: "en",
          metadata: { source: "Vector_Audit_Modal" }
        }),
      });

      const calData = await calResponse.json();
      console.log("[CAL_BOOKING_SUCCESS]:", calData);

    } catch (error) {
      console.error("[CAL_BOOKING_FAILED]:", error);
    }
  }

  return NextResponse.json({ received: true });
}