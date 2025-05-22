// src/routes/login/+page.server.ts
import type { Actions, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
// import { SECRET_TURNSTILE_KEY } from '$env/static/private';

export const actions: Actions = {
  default: async ({ request, cookies }: RequestEvent) => {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');
     const turnstile = form.get('cf-turnstile-response')?.toString() || '';

    if (typeof email !== 'string' || typeof password !== 'string') {
      return fail(400, { error: 'Invalid form submission' });
    }

    // if (!turnstile || !(await validateToken(turnstile))) {
    //   return fail(400, { error: 'Invalid CAPTCHA' });
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

// async function validateToken(token: string): Promise<boolean> {
//     const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: new URLSearchParams({
//             secret: SECRET_TURNSTILE_KEY,
//             response: token
//         })
//     });
//     const data = await response.json();
//     return data.success;
// }
