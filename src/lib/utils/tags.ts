import type { SelectOption } from '@adofai-gg/ui'

export const allTags = [
	'PSEUDO',
	'PSEUDO_P2',
	'GALLOP',
	'MAGIC_SHAPE',
	'GIMMICK',
	'MEMORIZATION',
	'NO_SPEED_CHANGES',
	'NO_TWIRLS',
	'EPILEPSY_WARNING',
	'TRIPLET',
	'QUINTUPLET',
	'SEPTUPLET',
	'POLYRHYTHM',
	'SWING',
	'TRESILLO',
	'FUNKY_BEAT',
	'BEAT_P64',
	'SPEED_CHANGES',
	'SLOW',
	'SUDDEN_ACCELERATION',
	'DLC'
]

export const tagOptions = allTags.map(
	(x) =>
		({
			label: `tags:${x}`,
			value: x
		}) as SelectOption<string>
)
