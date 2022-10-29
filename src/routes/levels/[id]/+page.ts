import { api } from '@/api';
import type { Level } from '@/types';
import { levelOpenGraphUrl } from '@/utils/og';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
  try {
    const { data } = await api.get<Level>(`/api/v1/levels/${params.id}`);
    return {
      ...data,
      meta: {
        title: `${data.music.artists.map((x) => x.name).join(' & ')} - ${data.title}`,
        metaTags: [
          {
            property: 'og:site_name',
            content: 'ADOFAI.gg'
          },
          {
            property: 'og:title',
            content: `${data.music.artists.map((x) => x.name).join(' & ')} - ${data.title}`
          },
          {
            property: 'og:description',
            content: `Level by ${data.creators.map((x) => x.name).join(' & ')}`
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            property: 'og:image',
            content: levelOpenGraphUrl(data.id)
          },
          {
            name: 'twitter:image',
            content: levelOpenGraphUrl(data.id)
          }
        ]
      }
    };
  } catch (e) {
    return {
      status: 404,
      error: e as Error
    };
  }
};
