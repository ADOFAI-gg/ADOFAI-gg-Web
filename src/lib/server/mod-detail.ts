import { api, ky } from '~/lib'
import type { APIMod, APIModComments } from '~/lib/types/mod'
import { renderMarkdown } from '~/lib/server/markdown'
import { error } from '@sveltejs/kit'
import type { ModDetailData } from '~/lib/types/mod'

export async function loadModDetail(
	modId: string,
	version: string | undefined,
	fetch: typeof globalThis.fetch
): Promise<ModDetailData> {
	const response = await ky.get(
		api.forum(
			`mods/${encodeURIComponent(modId)}${version === undefined ? '' : `/${encodeURIComponent(version)}`}`
		),
		{
			fetch,
			throwHttpErrors: false
		}
	)
	if (!response.ok) {
		error(response.status, response.status === 404 ? 'mod:not-found' : 'mod:detail-load-error')
	}
	const mod = await response.json<APIMod>()
	const comments = await ky
		.get(api.forum(`mods/${encodeURIComponent(modId)}/comments`), { fetch, retry: 0 })
		.json<APIModComments>()
		.catch(() => null)
	return {
		referenceTime: Date.now(),
		comments,
		mod,
		pageTitle: mod.name,
		versions: (mod.versions ?? []).map((version) => ({
			...version,
			descriptionHtml: renderMarkdown(version.description ?? '')
		})),
		descriptionHtml: renderMarkdown(mod.description ?? '')
	}
}
