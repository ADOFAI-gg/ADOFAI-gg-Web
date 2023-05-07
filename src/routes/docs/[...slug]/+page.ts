import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';
import { currentLang } from '@/utils/i18n';

let lang = '';

currentLang.subscribe((v) => (lang = v));

const pages = import.meta.glob('/src/content/*.md');

export const load: PageLoad = async ({ params }) => {
  const page =
    pages[`/src/content/${params.slug}.${lang}.md`] ?? pages[`/src/content/${params.slug}.md`];

  if (!page) throw error(404, { message: 'Post not found.' });

  const post = (await page()) as unknown as {
    default: SvelteComponent;
    metadata: Record<string, string>;
  };

  return {
    component: post.default,
    metadata: post.metadata ?? {}
  };
};
