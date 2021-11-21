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
  id: number;
  name: string;
};

export type Level = {
  title: string;
  artists: string[];
  song: string;
  creators: string[];
  minBpm: number;
  maxBpm: number;
  tiles: number;
  likes: number;
  tags: Tag[];
  difficulty: number;
};
