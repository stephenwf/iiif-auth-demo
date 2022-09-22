import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/cloudflare';
import { isRequestAuthedBearer } from '~/helpers';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const isAuthed = isRequestAuthedBearer(request);
  const origin = request.headers.get('origin');

  // For local testing.
  const localExample = `${url.protocol}//${url.host}/media/vivaldi${
    isAuthed ? '' : '-quiet'
  }.mp3`;

  const remoteExample = isAuthed
    ? 'https://iiifauth.digtest.co.uk/resources/23_32vs192kbps.mp3'
    : 'https://iiifauth.digtest.co.uk/resources/23_32vs192kbps_degraded.mp3';

  return json(
    {
      status: isAuthed ? 304 : 200,
      contentLocation: remoteExample,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Headers': 'Authorization',
      },
    }
  );
};
