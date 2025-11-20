import { apiBase } from '$lib/api';
import type { APILevel } from '$lib/types/api';
import { getIcon } from '@iconify/svelte';
import { z } from 'zod';

export const getDownloadUrl = (level: APILevel) => {
	if (level.file) {
		return `${apiBase}/levels/${level.id}/file`;
	}

	return level.downloadUrl!;
};

export const tagIconName = (tag: string) => `tag:${tag.split('_').join('-').toLowerCase()}`;

export const getTags = (tags: APILevel['tags']) => {
	const dangerTags: string[] = [];
	const warningTags: string[] = [];
	const result: string[] = [];

	for (const tag of tags) {
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

const youtubeIdRegex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;

export const getYoutubeVideoId = (url: string) => youtubeIdRegex.exec(url)?.[1] ?? '';

export const getLevelThumbnail = (level: APILevel): string | null => {
	const youtubeVideoId = getYoutubeVideoId(level.videoUrl);

	if (youtubeVideoId) {
		return `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
	}

	return null;
};

export const getYoutubeThumbnail = (url: string) => {
	const youtubeVideoId = getYoutubeVideoId(url);

	if (youtubeVideoId) {
		return `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
	}

	return null;
};

export const parseVideoUrl = (
	url: string
): { type: 'youtube'; videoId: string; start: number } | null => {
	const youtubeVideoId = getYoutubeVideoId(url);

	if (youtubeVideoId) {
		const start = parseInt(new URL(url).searchParams.get('t') ?? '0');

		return {
			type: 'youtube',
			videoId: youtubeVideoId,
			start: isNaN(start) ? 0 : start
		};
	}

	return null;
};

const urlSchema = z.string().url();

export const isYouTubeLink = (url: string): boolean => {
	if (!urlSchema.safeParse(url).success) {
		return false;
	}

	const u = new URL(url);

	if (u.protocol !== 'https:') return false;

	if (u.hostname === 'youtube.com' || u.hostname === 'www.youtube.com') {
		if (u.pathname.startsWith('/watch') && u.searchParams.get('v')) return true;
	}

	if (u.hostname === 'youtu.be') {
		return true;
	}

	return false;
};

export const isWorkshopLink = (url: string): boolean => {
	if (!urlSchema.safeParse(url).success) {
		return false;
	}

	const u = new URL(url);

	if (u.protocol !== 'https:') return false;

	if (u.hostname !== 'steamcommunity.com') return false;
	if (!u.pathname.startsWith('/sharedfiles/filedetails')) return false;
	if (!u.searchParams.get('id')) return false;

	return true;
};
