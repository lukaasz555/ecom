export const handleAuthors = (str: string) => {
	const arr = str.split(',');
	return arr.map((item) => item.trim());
};
