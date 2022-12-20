export const emailValidation = (email: string) => {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	if (regex.test(email)) {
		return true;
	} else {
		return false;
	}
};
