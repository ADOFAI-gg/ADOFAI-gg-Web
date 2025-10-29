export const checkFlag = (value: number, flag: number) => {
	return (value & (1 << 7)) === flag
}
