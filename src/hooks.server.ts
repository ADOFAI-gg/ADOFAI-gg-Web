import type { Handle, HandleFetch } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event)
	return response
}

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const cookie = event.request.headers.get('Cookie')
	if (cookie) request.headers.set('Cookie', cookie)
	return await fetch(request)
}
