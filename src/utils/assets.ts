import { dev } from '$app/environment';
import axios from 'axios';

export const svg = import.meta.glob('../assets/{icons,tagIcons}/*.svg', { eager: true, as: 'raw' });

const asset = (path: string) =>
  dev
    ? `https://raw.githubusercontent.com/ADOFAI-gg/Adofai-gg-assets/main/${path}`
    : `/assets/${path}`;

export class Asset {
  static icon(id: string, namespace = 'icons') {
    return asset(`${namespace}/${id}.svg`);
  }

  static difficultyIcon(difficulty: number) {
    return asset(`difficultyIcons/${difficulty}.svg`);
  }

  static url(id: string) {
    return asset(id);
  }

  static async loadJSON<T = Record<string, string>>(key: string) {
    return (await axios.get<T>(Asset.url(key))).data;
  }
}
