import type { Actions, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import {api} from '$env/static/private';

export const actions: Actions = {
  default: async ({ request, cookies }: RequestEvent) => {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      return fail(400, { error: 'Invalid form submission' });
    }

    const endpoint  = `${api}auth/login`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      console.log("reponse not ok", res);
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

    throw redirect(303, '/');
  }
};
