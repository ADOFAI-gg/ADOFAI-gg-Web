import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	return redirect(307, `/notices/${encodeURIComponent(params.noticeId)}`)
}
