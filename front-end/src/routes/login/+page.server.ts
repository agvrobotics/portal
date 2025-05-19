// src/routes/login/+page.server.ts
import type { Actions, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, cookies }: RequestEvent) => {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      return fail(400, { error: 'Invalid form submission' });
    }

    // const isTurnstileValid = await verifyTurnstile(turnstileToken);
    // if (!isTurnstileValid) {
    //   return fail(400, { error: 'Captcha verification failed' });
    // }

    const res = await fetch('https://backend.michaelmachohi.workers.dev/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const text = await res.text();
      return fail(res.status, { error: text });
    }

    const { token } = await res.json();
        cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 3600
    });

    throw redirect(303, '/dashboard/home');
  }
};

async function verifyTurnstile(token: string | any[]) {
  // In production, verify with Cloudflare's API
  return token && token.length > 0;
}
