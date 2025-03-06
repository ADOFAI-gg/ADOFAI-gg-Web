import { Previous } from 'runed'

export const clampState = (
	getter: () => number | null,
	setter: (v: number) => void,
	min: number,
	max: number
) => {
	const prev = new Previous(getter)

	$effect(() => {
		const current = getter()
		if (current === null) return
		if (current !== prev.current) {
			setter(Math.max(min, Math.min(current, max)))
		}
	})
}
