import { error, type RequestHandler } from '@sveltejs/kit'
import { api, ky } from '~/lib'

export const POST: RequestHandler = async ({ fetch, request }) => {
	const res = await ky.post(api.auth('common/update-lang'), {
		fetch,
		json: await request.json()
	})

	if (!res.ok) {
		const data = await res.json()
		if (res.status === 401) return error(401)
		console.error(res.status, data)
		return error(500)
	}

	return new Response(null, { status: 204 })
}
