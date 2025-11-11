import { apiBase } from '$lib/api';
import type { APILevel } from '$lib/types/api';
import { getIcon } from '@iconify/svelte';

export const getDownloadUrl = (level: APILevel) => {
	if (level.file) {
		return `${apiBase}/levels/${level.id}/file`;
	}

	return level.downloadUrl;
};

export const tagIconName = (tag: string) => `tag:${tag.split('_').join('-').toLowerCase()}`;

export const getTags = (level: APILevel) => {
	const dangerTags: string[] = [];
	const warningTags: string[] = [];
	const result: string[] = [];

	for (const tag of level.tags) {
		if (['NSFW', 'EPILEPSY_WARNING'].includes(tag.name)) {
			dangerTags.push(tag.name);
			continue;
		}
		if (['DLC'].includes(tag.name)) {
			warningTags.push(tag.name);
			continue;
		}
		result.push(tag.name);
	}

	return { danger: dangerTags, warning: warningTags, normal: result };
};

export const getDifficultyIconName = (difficulty: number | null | undefined, simplified = true) => {
	const _inner = () => {
		if (!difficulty) return 'difficulty:unknown';

		if (difficulty < 20) {
			return `difficulty:${Math.floor(difficulty)}${difficulty % 1 === 0.5 ? 'p' : ''}`;
		}

		let name = difficulty.toFixed(1).replace('.', '-');

		if (simplified) {
			name = Math.floor(difficulty) + (difficulty % 1 >= 0.5 ? 'p' : '');
		}

		return `difficulty:${name}`;
	};

	const result = _inner();

	if (!getIcon(result)) return 'difficulty:unknown';
	return result;
};
