export const getNumWithoutZeroToFixedN = (num: number, fixed: number) => {
	if (!isFinite(+num)) {
		return 0;
	}
	// console.log("num", num)
	let str;
	try {
		str = (+num).toFixed(fixed);
	} catch (e) {
		console.log(e)
		return 0;
	}

	const deleteZero = (s: string) => {
		let num = 0;
		if (s.includes(".") && s.endsWith("0")) {
			const s1 = s.slice(0, s.length - 1);

			num = deleteZero(s1);
		} else if (s.endsWith(".")) {
			const s2 = s.slice(0, s.length - 1);

			num = +s2;
		} else {
			num = +s;
		}
		return num;
	};

	return deleteZero(str).toLocaleString();
};
