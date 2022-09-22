import invariant from 'tiny-invariant';
import { createCookie } from '@remix-run/cloudflare'; // or cloudflare/deno

export const authCookie = createCookie('auth-cookie', {
  maxAge: 60, // one minute
});

export async function isRequestAuthed(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const parsed = await authCookie.parse(cookieHeader);

  return parsed === 'authed-cookie';
}

export function isRequestAuthedBearer(resp: Request) {
  const auth = resp.headers.get('Authorization');

  if (!auth) {
    return false;
  }

  const bearer = auth.slice('Bearer '.length);

  return bearer === 'authed-token';
}

export async function getToken(resp: Request) {
  if (await isRequestAuthed(resp)) {
    return 'authed-token';
  }
  return 'non-authed-token';
}
