import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/cloudflare';
import { authCookie } from '~/helpers';

export const action: ActionFunction = async () => {
  return redirect('/auth/post-login', {
    headers: {
      'Set-Cookie': await authCookie.serialize('authed-cookie'),
    },
  });
};

export default function Login() {
  return (
    <form method="post" action="/auth/login">
      <button type="submit">Login</button>
    </form>
  );
}
