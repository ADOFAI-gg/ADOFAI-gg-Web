import type { APINotice } from '~/lib/types'
import type { NoticeCategory } from '~/lib/types'
import type { TranslationKey } from '@adofai-gg/ui'

export const NOTICE_CATEGORIES: NoticeCategory[] = [
	'FORUM',
	'WEBSITE',
	'EVENT',
	'UPDATE',
	'MAINTENANCE'
]

export function noticeCategoryKey(category: NoticeCategory): TranslationKey {
	return `main:notice-category-${category}` as TranslationKey
}

export function formatNoticeDate(
	iso: string | null | undefined,
	lang = 'ko',
	full = false
): string {
	if (!iso) return ''
	const date = new Date(iso)
	if (Number.isNaN(date.getTime())) return ''

	if (full) {
		return new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date)
	}

	const now = new Date()
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
	const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
	const diffDays = Math.round((startOfToday - startOfTarget) / (1000 * 60 * 60 * 24))

	if (diffDays === 0) {
		return lang === 'ko' ? '오늘' : 'Today'
	}
	if (diffDays === 1) {
		return lang === 'ko' ? '어제' : 'Yesterday'
	}

	const sameYear = date.getFullYear() === now.getFullYear()
	if (lang === 'ko') {
		return sameYear
			? `${date.getMonth() + 1}월 ${date.getDate()}일`
			: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
	}

	return new Intl.DateTimeFormat('en-US', {
		...(sameYear ? {} : { year: 'numeric' }),
		month: 'short',
		day: 'numeric'
	}).format(date)
}

export function localizeNotice(notice: APINotice, language: string): APINotice {
	const translation = notice.translations?.[language]
	return translation ? { ...notice, ...translation } : notice
}
