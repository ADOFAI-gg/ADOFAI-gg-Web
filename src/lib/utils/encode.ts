export const encode = (
	str: TemplateStringsArray,
	...encodingParams: (boolean | number | string)[]
): string => {
	return str.map((s, i) => s + encodeURIComponent(encodingParams[i] ?? '')).join('')
}
