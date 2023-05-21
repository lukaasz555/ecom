import * as Yup from 'yup';

export const validateMessage = Yup.object({
	email: Yup.string()
		.email('Wprowadź poprawny adres e-mail')
		.required('To pole jest wymagane'),
	subject: Yup.string()
		.required('To pole jest wymagane')
		.max(42, 'Wprowadzono zbyt wiele znaków'),
	message: Yup.string().required('To pole jest wymagane'),
});

export const emailValidation = (email: string) => {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	if (regex.test(email) && email.length >= 3) {
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
