import type { LoaderFunction } from '@remix-run/node';
import { authCookie } from '~/helpers';

export const loader: LoaderFunction = async ({ request }) => {
  const origin = request.headers.get('origin');

  return new Response('<script>window.close()</script>', {
    headers: {
      'Content-type': 'text/html',
      'Set-Cookie': await authCookie.serialize('authed-cookie'),
      'Access-Control-Allow-Origin': origin || '*',
    },
  });
};
