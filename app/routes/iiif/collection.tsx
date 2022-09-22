import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/cloudflare';
import { IIIFBuilder } from 'iiif-builder';

export const loader: LoaderFunction = ({ request }) => {
  const builder = new IIIFBuilder();
  const url = new URL(request.url);
  const origin = request.headers.get('origin');

  const newCollection = builder.createCollection(
    `${url.protocol}//${url.host}/iiif/collection`,
    (collection) => {
      collection.addLabel('Collection', 'en');

      collection.createManifest(
        `${url.protocol}//${url.host}/iiif/manifest`,
        (manifest) => {
          manifest.addLabel('An example manifest');
        }
      );
    }
  );

  return json(builder.toPresentation2(newCollection), {
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
    },
  });
};
