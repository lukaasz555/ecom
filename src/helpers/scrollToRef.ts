export const scrollToRef = (ref: any) => {
	window.scrollTo({
		top: ref.offsetTop,
		left: 0,
		behavior: 'smooth',
	});
};
