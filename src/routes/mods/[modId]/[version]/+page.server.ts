import { loadModDetail } from '~/lib/server/mod-detail'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = ({ params, fetch }) =>
	loadModDetail(params.modId!, params.version!, fetch)
