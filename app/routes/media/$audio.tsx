import type { LoaderFunction } from '@remix-run/node';
// import { promises as fs } from 'node:fs';
// import { resolve, parse } from 'node:path';
// import { isRequestAuthed } from '~/helpers';
//
// const resolveFile = (name: string) =>
//   resolve(process.cwd(), `./audio/${name}.mp3`);

export const loader: LoaderFunction = async ({ params, request }) => {
  // if (!params.audio) throw new Error('No valid audio');
  // const isAuthed = isRequestAuthed(request);
  //
  // const { name: filename } = parse(params.audio);
  //
  // if (!isAuthed && !filename.endsWith('-quiet')) {
  //   return new Response('', {
  //     status: 403,
  //   });
  // }
  //
  // const file = await fs.readFile(resolveFile(filename));
  // return new Response(file.buffer, {
  //   headers: {
  //     'Content-Type': 'audio/mp3',
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': `${file.length}`,
  //   },
  // });

  return new Response('Not available');
};
