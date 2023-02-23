import tags from '@/assets/tags.json';

type TagGroup = { key: string; tags: number[] };

export const tagGroups = tags.groups as TagGroup[];
