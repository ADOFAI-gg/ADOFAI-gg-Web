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

export interface PartialMember {
  id: number;
  name: string;
}

export interface Member extends PartialMember {
  totalPp: number;
}

export interface PartialMusic {
  id: number;
  name: string;

  minBpm: number;
  maxBpm: number;

  artists: PartialMember[];
}

export interface Music extends PartialMusic {
  createdLevelAmount: number;
}

export interface Level {
  id: number;
  title: string;
  difficulty: number;
  creators: PartialMember[];
  music: PartialMusic;
  tiles: number;
  video: string;

  download: string;
  workshop: string | null;

  tags: Tag[];

  epilepsyWarning: boolean;

  // and more(not added)
}

export interface Tag {
  id: number;
  name: string;
}

export interface ListResponse<T> {
  results: T[];
  count: number;
}
