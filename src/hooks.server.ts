import { sequence } from '@sveltejs/kit/hooks'
import * as Sentry from '@sentry/sveltekit'
import { env as pubEnv } from '$env/dynamic/public'
import { env as privEnv } from '$env/dynamic/private'
import type { Handle, HandleFetch } from '@sveltejs/kit'
import { dev } from '$app/environment'
import { setupSidecar } from '@spotlightjs/spotlight/sidecar'

Sentry.init({
	dsn: 'https://b0666c31b6c64ee6b8c89c6f461ce173@trace.afg.ink/1',
	tracesSampleRate: 1,
	environment: dev ? 'dev' : pubEnv.PUBLIC_SENTRY_ENV || 'prod',

	spotlight: dev
})

const base = pubEnv.PUBLIC_API_BASE!
const target = privEnv.INTERNAL_API_BASE

export const handle: Handle = sequence(Sentry.sentryHandle())

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const cookie = event.request.headers.get('Cookie')
	if (cookie) request.headers.set('Cookie', cookie)

	if (target && request.url.startsWith(base)) {
		const res = await fetch(request.url.replace(base, target), request)
		return res
	}

	return await fetch(request)
}
export const handleError = Sentry.handleErrorWithSentry()

if (dev) {
	setupSidecar()
}
