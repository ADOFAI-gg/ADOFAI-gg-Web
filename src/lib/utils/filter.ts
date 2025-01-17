import type { SearchFilter, SearchOptionScheme } from '@adofai-gg/ui'
import { v4 } from 'uuid'

export const parseFilterItem = (rawData: any, scheme: SearchOptionScheme): SearchFilter => {
	const schemeData = scheme.filter[rawData.key]
	if (!schemeData) throw new Error('unknown key')

	let value = rawData.value

	switch (schemeData.type) {
		case 'string':
			if (typeof value !== 'string') throw new Error('invalid type')
			break
		default:
			throw new Error('not implemented')
	}

	return { key: rawData.key, value, id: v4() }
}

export const parseFilter = (
	filterStr: string | null,
	scheme: SearchOptionScheme
): SearchFilter[] => {
	if (!filterStr) return []

	try {
		const rawData: unknown[] = JSON.parse(filterStr)
		return rawData
			.map((x) => {
				try {
					return parseFilterItem(x, scheme)
				} catch (e) {
					console.warn(e)
					return null
				}
			})
			.filter((x) => x) as SearchFilter[]
	} catch {
		return []
	}
}
