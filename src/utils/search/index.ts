import { parse } from './parser';

export interface SearchChunk {
  type: 'artist' | 'creator' | 'song' | 'normal' | 'difficulty' | 'minBpm' | 'maxBpm' | 'minTiles' | 'maxTiles';
  value: string;
  afterLabel?: string | null
  afterExp?: string | null
  quote: string | null;
}

export const parseSearchString = (text: string) => {
  const items = parse(text);

  return items as SearchChunk[];
};

export class SearchStringAnalyzer {
  constructor(private chunks: SearchChunk[]) {}

  get artist() {
    return this.chunks.find((x) => x.type === 'artist')?.value ?? '';
  }

  get song() {
    return this.chunks.find((x) => x.type === 'song')?.value ?? '';
  }

  get creator() {
    return this.chunks.find((x) => x.type === 'creator')?.value ?? '';
  }

  get normal() {
    return this.chunks
      .filter((x) => x.type === 'normal')
      .map((x) => x.value)
      .join(' ');
  }
}

export const encodeSearchString = (chunks: SearchChunk[]): string => {
  let result = '';

  for (const chunk of chunks) {
    if (chunk.type === 'normal') {
      result += chunk.value;
    } else {
      result +=
        `${chunk.type}:` +
        (chunk.quote
          ? `${chunk.quote}${chunk.value.split(chunk.quote).join(`\\${chunk.quote}`)}${chunk.quote}`
          : chunk.value);
    }
  }

  return result;
};
