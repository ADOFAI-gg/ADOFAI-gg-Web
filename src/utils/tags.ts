import { writable } from 'svelte/store';
import { Asset } from './assets';

type TagGroup = { key: string; tags: number[] };

export const tagGroups = writable<TagGroup[]>([]);

export const loadTags = async () => {
  const { groups } = await Asset.loadJSON<{ groups: TagGroup[] }>('tags.json');

  tagGroups.set(groups);
};
