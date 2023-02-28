export interface PlayLog {
  accept: boolean;
  description: string;
  id: number;
  level: { id: number; name: string };
  playPoint: number;
  player: { id: number; name: string };
  speed: number;
  timestamp: string;
  url: string;
  xAccuracy: number;
}

export type PlayLogWithLevel = PlayLog & {
  level: Level;
};

export interface Ranking {
  id: number;
  name: string;
  totalPp: number;
  bestPlay: PlayLog;
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
  censored: boolean;

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

export interface DifficultyReference {
  difficulty: number;
  ppRating: number;
  levels: (DifficultyReferenceLevel | null)[];
}

export type DifficultyReferenceLevel =
  | DifficultyReferenceLevelForum
  | DifficultyReferenceLevelOfficial;

export interface DifficultyReferenceLevelForum {
  levelId: number;
  name: string;
  url: null;
}

export interface DifficultyReferenceLevelOfficial {
  levelId: null;
  name: string;
  url: string;
}

export interface RawDifficultyReference {
  difficulty: number;
  easiestLevel: boolean;
  position: number;
  level: DifficultyReferenceLevel;
}

export interface RawPPRatings {
  difficulty: number;
  rating: number;
}
