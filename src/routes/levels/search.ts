import type { AndFilter, Filter, SearchQuery, Sort } from '@adofai-gg/query-types'
import { translateKey, type SearchOptionScheme, type SearchOptionsData } from '@adofai-gg/ui'
import { api, localizeOptions, type APILevel } from '~/lib'
import { difficultyOptions } from '~/lib/utils/difficulty'
import { tagOptions } from '~/lib/utils/tags'

// @ts-expect-error svelte file import
import { difficultyIconTemplate } from '~/lib/utils/difficultySnippets.svelte'
// @ts-expect-error svelte file import
import { tagIconTemplate } from './snippets.svelte'

import type { Snippet } from 'svelte'
import { parseFilter } from '~/lib/utils/filter'

export const pageSize = 50

export const getLevelSearchOptions = (url: URL, scheme: SearchOptionScheme) => {
	const params = url.searchParams
	const rawSort = params.get('sort')

	return {
		filter: parseFilter(params.get('f'), scheme),
		sort: scheme.sort.find((x) => x.objective === rawSort)?.objective || 'id:desc'
	}
}

export const buildLevelSearchScheme = (lang: string): SearchOptionScheme =>
	({
		filter: {
			'music.name': {
				default: '',
				icon: 'music',
				label: 'level:filter-music',
				name: 'level:filter-music',
				type: 'string'
			},
			'music.artists.name': {
				default: '',
				icon: 'creator',
				label: 'level:filter-artist',
				name: 'level:filter-artist',
				type: 'string'
			},
			'creators.name': {
				default: '',
				icon: 'creator',
				label: 'level:filter-creator',
				name: 'level:filter-creator',
				type: 'string'
			},
			quality: {
				type: 'select',
				name: 'level:filter-quality',
				icon: 'category',
				default: ['LISTED', 'FEATURED', 'LEGENDARY'],
				options: localizeOptions(lang, [
					{
						value: 'LISTED',
						label: 'level:quality-listed'
					},
					{
						value: 'FEATURED',
						label: 'level:quality-featured'
					},
					{
						value: 'LEGENDARY',
						label: 'level:quality-legendary'
					}
				]),
				label: 'level:filter-quality',
				multiple: true
			},
			difficulty: {
				type: 'rangeSelect',
				name: 'level:filter-difficulty',
				icon: 'difficulty',
				minLabel: 'level:filter-difficulty-min',
				maxLabel: 'level:filter-difficulty-max',
				default: [],
				options: difficultyOptions,
				optionIconSnippet: difficultyIconTemplate as Snippet<[]>
			},
			'tags.name': {
				type: 'select',
				options: localizeOptions(lang, tagOptions),
				default: [],
				multiple: true,
				name: 'level:filter-tags',
				icon: 'tag',
				label: 'level:filter-tags',
				optionIconSnippet: tagIconTemplate as Snippet<[]>
			},
			tile: {
				type: 'range',
				icon: 'tile',
				name: 'level:filter-tiles',
				min: 1,
				minLabel: 'level:filter-tiles-min',
				maxLabel: 'level:filter-tiles-max',
				default: []
			},
			bpm: {
				type: 'range',
				icon: 'bpm',
				name: 'level:filter-bpm',
				min: 1,
				minLabel: 'level:filter-bpm-min',
				maxLabel: 'level:filter-bpm-max',
				default: []
			}
		},
		sort: [
			{
				name: translateKey(lang, 'level:sort-id-desc', {}),
				objective: 'id:desc'
			},
			{
				name: translateKey(lang, 'level:sort-id-asc', {}),
				objective: 'id:asc'
			},
			{
				name: translateKey(lang, 'level:sort-difficulty-desc', {}),
				objective: 'difficulty:desc'
			},
			{
				name: translateKey(lang, 'level:sort-difficulty-asc', {}),
				objective: 'difficulty:asc'
			}
		]
	}) satisfies SearchOptionScheme

export const fetchLevels = async (skip: number, take: number, query: SearchQuery) => {
	const url = new URL(api.forum('levels/search'))

	const res = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			skip,
			take,
			query
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	if (!res.ok) throw new Error(`Request failed with status code: ${res.status}`)

	const data = await res.json()

	return data.results as APILevel[]
}

export const buildLevelQuery = (
	search: string,
	searchOptions: SearchOptionsData,
	scheme: SearchOptionScheme
): SearchQuery => {
	const rootFilter: Filter = {
		op: 'and',
		data: []
	}
	const sort: Sort[] = []

	const hasSearchQuery = search.length >= 1
	const hasOptionalFilter = searchOptions.filter.length >= 1

	if (hasSearchQuery) {
		rootFilter.data.push({
			op: 'or',
			data: [
				{
					op: 'stringContains',
					key: 'music.name',
					value: search,
					ignoreCase: true
				},
				{
					op: 'stringContains',
					key: 'music.artists.name',
					value: search,
					ignoreCase: true
				},
				{
					op: 'stringContains',
					key: 'creators.name',
					value: search,
					ignoreCase: true
				}
			]
		} satisfies Filter)
	}

	if (hasOptionalFilter) {
		for (const filter of searchOptions.filter) {
			const schemeData = scheme.filter[filter.key]
			if (!schemeData) continue

			switch (schemeData.type) {
				case 'string':
					rootFilter.data.push({
						op: 'stringContains',
						key: filter.key,
						value: filter.value as string,
						ignoreCase: true
					})
					break
				case 'select':
					if (schemeData.multiple) {
						if (filter.key === 'tags.name') {
							rootFilter.data.push({
								op: 'containsAll',
								key: filter.key,
								values: filter.value as string[]
							})
						} else
							rootFilter.data.push({
								op: 'or',
								data: (filter.value as string[]).map((x) => ({
									op: 'eq',
									key: filter.key,
									value: x
								}))
							})
					} else {
						// TODO make this
					}

					break
				case 'range':
				case 'rangeSelect': {
					const v = filter.value as number[]
					const min = v[0]
					const max = v[1]

					const q = {
						op: 'and',
						data: []
					} as AndFilter

					if (min !== undefined) {
						q.data.push({
							op: 'gte',
							key: filter.key === 'bpm' ? 'minBpm' : filter.key,
							value: min
						} satisfies Filter)
					}

					if (max !== undefined) {
						q.data.push({
							op: 'lte',
							key: filter.key === 'bpm' ? 'maxBpm' : filter.key,
							value: max
						} satisfies Filter)
					}

					rootFilter.data.push(q)
					break
				}
				default:
					break
			}
		}
	}

	if (searchOptions.sort) {
		const [objective, direction] = searchOptions.sort.split(':')
		if (['asc', 'desc'].includes(direction)) {
			sort.push({
				objective,
				direction: direction as 'asc' | 'desc'
			})
		}
	}

	return {
		filter: hasSearchQuery || hasOptionalFilter ? rootFilter : null,
		sort
	}
}
