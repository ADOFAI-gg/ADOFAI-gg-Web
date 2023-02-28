import { api } from '@/api';
import type { Level } from '@/types';
import { levelOpenGraphUrl } from '@/utils/og';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { data, status } = await api.get<Level>(`/api/v1/levels/${params.id}`, {
    validateStatus: (status) => [200, 404].includes(status)
  });

  if (status === 404) {
    throw error(404, {
      message: 'Level not found'
    });
  }

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
};
