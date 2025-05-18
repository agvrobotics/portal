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

    const res = await fetch('https://backend.michaelmachohi.workers.dev/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const text = await res.text();
      return fail(res.status, { error: text });
    }

    const { token, message } = await res.json();
        cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 3600
    });
    console.log('Login successful:', message);

    throw redirect(303, '/dashboard/home');
  }
};
