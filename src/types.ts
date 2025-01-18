export interface ListResponse<T> {
	results: T[]
	count: number
}

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void
	}
}
