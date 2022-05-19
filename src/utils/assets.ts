const asset = (path: string) =>
  `https://raw.githubusercontent.com/ADOFAI-gg/Adofai-gg-assets/main/${path}`;

export class Asset {
  static icon(id: string) {
    return asset(`icons/${id}.svg`);
  }

  static difficultyIcon(difficulty: number) {
    return asset(`difficultyIcons/${difficulty}.svg`);
  }

  static url(id: string) {
    return asset(id);
  }
}
