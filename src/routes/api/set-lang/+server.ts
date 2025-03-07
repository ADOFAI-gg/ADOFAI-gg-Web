import { error, type RequestHandler } from '@sveltejs/kit'
import { api } from '~/lib'

export const POST: RequestHandler = async ({ fetch, request }) => {
	const res = await fetch(api.auth('common/update-lang'), {
		method: 'POST',
		credentials: 'include',
		body: await request.json()
	})

	if (!res.ok) {
		const data = await res.json()
		if (res.status === 401) return error(401)
		console.error(res.status, data)
		return error(500)
	}

	return new Response(null, { status: 204 })
}
