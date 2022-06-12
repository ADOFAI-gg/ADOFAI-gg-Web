export interface User {
  id: string;
  name: string;
  avatar?: string;
  banner?: string;
}

export interface PlayLog {
  accept: boolean;
  accuracy: number;
  description: string;
  id: number;
  level: { id: number; name: string };
  playPoint: number;
  player: { id: number; name: string };
  rawAccuracy: number;
  speed: number;
  timestamp: string;
  url: string;
}

export interface Level {
  id: number;
  title: string;
  difficulty: number;
  creators: string[];
  artists: string[];
  music: string;
  minBpm: number;
  maxBpm: number;
  tiles: number;
  video: string;

  download: string;
  workshop: string | null;

  // and more(not added)
}

export interface ListResponse<T> {
  results: T[];
  count: number;
}
