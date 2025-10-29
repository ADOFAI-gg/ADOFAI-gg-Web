import { dev } from '$app/environment'
import { handleErrorWithSentry } from '@sentry/sveltekit'
import * as Sentry from '@sentry/sveltekit'
import { env } from '$env/dynamic/public'

Sentry.init({
	dsn: 'https://b0666c31b6c64ee6b8c89c6f461ce173@trace.afg.ink/1',
	tracesSampleRate: 1.0,

	environment: dev ? 'dev' : env.PUBLIC_SENTRY_ENV || 'prod',

	spotlight: dev
})

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry()
