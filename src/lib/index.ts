import { env } from '$env/dynamic/public'
import './localization'

const base = env.PUBLIC_API_BASE

export const api = {
	forum: (endpoint: string) => `${base}/forum/v1/${endpoint}`
}

export * from './types'

export * from './utils/parser'
