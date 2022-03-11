export type Play = {
  accept: boolean;
  accuracy: number;
  description: string;
  id: number;
  level: { id: number; name: string };
  playPoint: number;
  player: {
    id: number;
    name: string;
  };
  rawAccuracy: number;
  speed: number;
  timestamp: string;
  url: string;
};

export type Tag = {
  id: string | number;
  name: string;
  icon?: string;
  default?: boolean;
};

export type User = {
  id: string;
  name: string;
  banner: string | null;
  avatar: string | null;
};

export type Level = {
  id: number;
  title: string;
  artists: User[];
  song: string;
  creators: User[];
  minBpm: number;
  maxBpm: number;
  tiles: number;
  likes: number;
  tags: Tag[];
  difficulty: number;
  download: string;
  workshop: string | null;
  video: string;
};

export interface ApiListResult<T> {
  count: number;
  results: T[];
}
