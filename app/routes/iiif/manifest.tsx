import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/cloudflare';
import { IIIFBuilder } from 'iiif-builder';

export const loader: LoaderFunction = ({ request }) => {
  const builder = new IIIFBuilder();
  const url = new URL(request.url);
  const origin = request.headers.get('origin');

  const manifestId = `${url.protocol}//${url.host}/iiif/manifest`;

  const newManifest = builder.createManifest(manifestId, (manifest) => {
    manifest.addLabel('Audio 1', 'en');

    // This is the login services. (Does not work with Auth demo, so duplicated below)
    manifest.addServicesProperty({
      '@id': `${url.protocol}//${url.host}/auth/login`,
      type: 'AuthCookieService1',
      profile: 'http://iiif.io/api/auth/1/login',
      description:
        'Some portions of this recording may be unavailable due to rights restrictions.',
      header: 'Please Log-In',
      label: 'Login',
      service: [
        {
          '@id': `${url.protocol}//${url.host}/auth/api/token`,
          type: 'AuthTokenService1',
          profile: 'http://iiif.io/api/auth/1/token',
        },
      ],
    });

    manifest.createCanvas(manifestId + 'canvas/p1', (canvas) => {
      canvas.width = 1800;
      canvas.height = 1200;
      canvas.createAnnotation(manifestId + '/annotation/p0001-image', {
        id: manifestId + '/annotation/p0001-image',
        type: 'Annotation',
        motivation: 'painting',
        body: {
          // FOR LOCAL TESTING
          // id: `${url.protocol}//${url.host}/media/vivaldi.mp3`,
          id: 'https://iiifauth.digtest.co.uk/resources/23_32vs192kbps.mp3',
          type: 'Audio',
          duration: 200,
          format: 'audio/mp3',
          service: [
            // The login service.
            {
              '@id': `${url.protocol}//${url.host}/auth/login`,
              type: 'AuthCookieService1',
              profile: 'http://iiif.io/api/auth/1/login',
              description:
                'Some portions of this recording may be unavailable due to rights restrictions.',
              header: 'Please Log-In',
              label: 'Login',
              service: [
                {
                  '@id': `${url.protocol}//${url.host}/auth/api/token`,
                  type: 'AuthTokenService1',
                  profile: 'http://iiif.io/api/auth/1/token',
                },
              ],
            },
            // The probe service.
            {
              '@id': `${url.protocol}//${url.host}/auth/api/probe`,
              type: 'AuthProbeService1',
              profile: 'http://iiif.io/api/auth/1/probe',
            },
          ],
        } as any,
      });
    });
  });

  return json(builder.toPresentation3(newManifest), {
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
    },
  });
};
