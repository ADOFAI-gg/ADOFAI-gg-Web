import type { Level } from '@/types';

export const dummpyLevel: Level = {
  id: 1,
  title: '[ns]',
  difficulty: 20.3,
  creators: [{ id: 1215, name: 'Ruren' }],
  music: {
    id: 1300,
    name: '[ns]',
    minBpm: 0.0,
    maxBpm: 0.0,
    artists: [{ id: 1552, name: 'かめりあ(Camellia)' }]
  },
  tiles: 2542,
  // comments: 0,
  // likes: 0,
  epilepsyWarning: false,
  censored: false,
  // description: '',
  video: 'https://youtu.be/VdsntFy8bc0',
  download: 'https://cdn.discordapp.com/attachments/750201197809631323/919205080190820372/ns.zip',
  workshop: null,
  tags: [
    { id: 2, name: '셋잇단' },
    { id: 11, name: '4분이상' },
    { id: 12, name: '개박' },
    { id: 13, name: '동시치기' }
  ]
};
