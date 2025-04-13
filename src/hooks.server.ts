import { env as pubEnv } from '$env/dynamic/public'
import { env as privEnv } from '$env/dynamic/private'
import type { Handle, HandleFetch } from '@sveltejs/kit'

const base = pubEnv.PUBLIC_API_BASE!
const target = privEnv.INTERNAL_API_BASE

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event)
	return response
}

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const cookie = event.request.headers.get('Cookie')
	if (cookie) request.headers.set('Cookie', cookie)

	if (target && request.url.startsWith(base)) {
		const res = await fetch(request.url.replace(base, target), request)
		return res
	}

	return await fetch(request)
}
