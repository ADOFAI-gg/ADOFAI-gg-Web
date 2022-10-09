import { api } from '@/api';
import type { Level } from '@/types';
import { getYoutubeVideoId } from '@/utils/youtube';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
  try {
    const { data } = await api.get<Level>(`/api/v1/levels/${params.id}`);
    const youtubeId = getYoutubeVideoId(data.video);
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
            content: `https://i.ytimg.com/vi/${youtubeId}/original.jpg`
          },
          {
            name: 'twitter:image',
            content: `https://i.ytimg.com/vi/${youtubeId}/original.jpg`
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