export const emailValidation = (email: string) => {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	if (regex.test(email)) {
		return true;
	} else {
		return false;
	}
};

export const inpostValidation = (inpost: string) => {
	const regex = /[A-Z]+[0-9]+[A-Z]/;
	if (regex.test(inpost) && inpost.length >= 5 && inpost.length <= 10) {
		return true;
	} else {
		return false;
	}
};
