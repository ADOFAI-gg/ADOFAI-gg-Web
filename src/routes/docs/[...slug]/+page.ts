import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent, params, url }) => {
	const parentData = await parent()
	const langCandiates = [url.searchParams.get('lang') || parentData.lang, 'ko']

	let doc: any = null

	for (const lang of langCandiates) {
		try {
			doc = await import(`../../../docs/${lang}/${params.slug}.md`)
			break
		} catch (e) {
			// ignored
		}
	}

	if (!doc) {
		return error(404, 'document not found')
	}

	return { content: doc.default, metadata: doc.metadata }
}
