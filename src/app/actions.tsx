'use server';

import { prisma } from '@/lib/prisma'; // Ensure this points to your prisma.ts file

const TURNSTILE_SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

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