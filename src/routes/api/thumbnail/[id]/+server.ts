import type { RequestHandler } from '@sveltejs/kit';
import sharp from 'sharp';

export const GET: RequestHandler = async ({ params }) => {
  const id = params.id;

  const buf = await (await fetch(`https://i.ytimg.com/vi/${id}/original.jpg`)).arrayBuffer();

  const res = await sharp(Buffer.from(buf)).resize(640, 360).webp().toBuffer();

  return new Response(res, {
    headers: {
      'content-type': 'image/webp',
      'cache-control': 'max-age=1209600'
    }
  });
};
