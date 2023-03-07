import { parse } from './parser';

export interface SearchChunk {
  type: 'artist' | 'creator' | 'song' | 'normal';
  value: string;
  quote: string | null;
}

export const parseSearchString = (text: string) => {
  const items = parse(text);

  return items as SearchChunk[];
};

const escape = (text: string) => `"${text.replace(/(["'])/g, '\\$1')}"`;

export const encodeSearchString = (chunks: SearchChunk[]): string => {
  let result = '';

  for (const chunk of chunks) {
    if (chunk.type === 'normal') {
      result += chunk.value;
    } else {
      result += `${chunk.type}:` + escape(chunk.value);
    }
  }

  return result;
};
