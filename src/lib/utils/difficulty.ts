import type { SelectOption } from '@adofai-gg/ui'

export const difficulties = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18.5, 19, 19.5, 20, 20.1, 20.2,
	20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9, 21, 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7, 21.8,
	21.9, 22, 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.7, 22.8, 22.9
]

const getDifficultyLabel = (v: number) => {
	if (v === 18.5) return '18+'
	if (v === 19.5) return '19+'
	if (v === 20) return '20.0'
	if (v === 21) return '21.0'
	if (v === 22) return '22.0'
	if (v === 23) return '23.0'

	return `${v}`
}

export const difficultyOptions = difficulties.map(
	(x) =>
		({
			label: getDifficultyLabel(x),
			value: x
		}) as SelectOption<number>
)
