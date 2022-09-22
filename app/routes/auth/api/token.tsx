import { useEffect } from 'react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getToken } from '~/helpers';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const token = await getToken(request);
  const messageId = url.searchParams.get('messageId');
  const origin = url.searchParams.get('origin');

  return json({
    token,
    messageId,
    origin,
  });
};

export default function Token() {
  const { token, messageId, origin } = useLoaderData();

  useEffect(() => {
    if (window && window.parent) {
      // Example only..
      window.parent.postMessage(
        {
          messageId: messageId,
          accessToken: token,
          expiresIn: 3600,
        },
        origin
      );
    }
  }, []);

  return <div>Close window</div>;
}
