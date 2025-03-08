import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	try {
		const doc = await import(`../../../../docs/${params.lang}/${params.slug}.md`)

		return { content: doc.default, metadata: doc.metadata }
	} catch (e) {
		return error(404, 'document not found')
	}
}
