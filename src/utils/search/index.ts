import { parse } from './parser';

export interface SearchChunk {
  type:
    | 'artist'
    | 'creator'
    | 'song'
    | 'normal'
    | 'minDifficulty'
    | 'maxDifficulty'
    | 'minBpm'
    | 'maxBpm'
    | 'minTiles'
    | 'maxTiles';
  value: string;
  afterLabel?: string | null;
  afterExp?: string | null;
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

  get minBpm() {
    const value = this.chunks.find((x) => x.type === 'minBpm')?.value;

    if (!value) return;

    return +value;
  }

  get maxBpm() {
    const value = this.chunks.find((x) => x.type === 'maxBpm')?.value;

    if (!value) return;

    return +value;
  }

  get minTiles() {
    const value = this.chunks.find((x) => x.type === 'minTiles')?.value;

    if (!value) return;

    return +value;
  }

  get maxTiles() {
    const value = this.chunks.find((x) => x.type === 'maxTiles')?.value;

    if (!value) return;

    return +value;
  }

  get minDifficulty() {
    let value = this.chunks.find((x) => x.type === 'minDifficulty')?.value;

    if (value === 'tiny') {
      value = '0.1';
    } else if (value === '-1') {
      value = '101';
    }

    if (!value) return null;

    return +(value ?? '');
  }

  get maxDifficulty() {
    let value = this.chunks.find((x) => x.type === 'maxDifficulty')?.value;

    if (value === 'tiny') {
      value = '0.1';
    } else if (value === '-1') {
      value = '101';
    }

    if (!value) return null;

    return +(value ?? '');
  }

  get normal() {
    return this.chunks
      .filter((x) => x.type === 'normal')
      .map((x) => x.value)
      .join('');
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

    if (!result.endsWith(' ')) result += ' ';
  }

  result = result.trimEnd();

  return result;
};
