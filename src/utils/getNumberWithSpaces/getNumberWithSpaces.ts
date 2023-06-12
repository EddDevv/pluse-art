// Function for placing commas in numbers
export const getNumberWithSpaces = (num: number) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
