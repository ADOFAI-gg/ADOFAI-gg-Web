/* eslint-disable @typescript-eslint/no-empty-interface */

export interface PlayLog {}

export interface Level {
  id: number;
  title: string;
  difficulty: number;
  creators: string[];
  artists: string[];
  music: string;
  minBpm: number;
  maxBpm: number;
  video: string;

  download: string;
  workshop: string | null;
  // and more(not added)
}
