import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';

const pages = import.meta.glob('/src/content/*.md');

export const load: PageLoad = async ({ params, parent }) => {
  const { initialLang } = await parent();
  const page =
    pages[`/src/content/${params.slug}.${initialLang}.md`] ??
    pages[`/src/content/${params.slug}.md`];

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
