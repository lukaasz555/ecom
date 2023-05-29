import * as Yup from 'yup';

export const messageValidation = Yup.object({
	email: Yup.string()
		.email('Wprowadź poprawny adres e-mail')
		.required('To pole jest wymagane'),
	subject: Yup.string()
		.required('To pole jest wymagane')
		.max(42, 'Wprowadzono zbyt wiele znaków'),
	message: Yup.string().required('To pole jest wymagane'),
});

export const loginValidation = Yup.object({
	email: Yup.string()
		.email('Wprowadź poprawny adres e-mail')
		.required('To pole jest wymagane'),
	password: Yup.string().required('To pole jest wymagane'),
});

export const registerValidation = Yup.object({
	email: Yup.string()
		.email('Wprowadź poprawny adres e-mail')
		.required('To pole jest wymagane'),
	password: Yup.string().required('To pole jest wymagane'),
	name: Yup.string()
		.required('To pole jest wymagane')
		.max(40, 'Przekroczono 40 znaków'),
	lastname: Yup.string()
		.required('To pole jest wymagane')
		.max(40, 'Przekroczono 40 znaków'),
	consent: Yup.boolean().oneOf([true], 'Wymagana zgoda'),
});

export const emailOnlyValidation = Yup.object({
	email: Yup.string()
		.email('Wprowadź poprawny adres e-mail')
		.required('To pole jest wymagane'),
});

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const inpostRegExp = /[A-Z]+[0-9]+[A-Z]/;

export const shippingValidation = Yup.object({
	phoneNumber: Yup.string()
		.matches(phoneRegExp, 'Podaj poprawny nr telefonu')
		.required('To pole jest wymagane')
		.min(9, 'Numer powinien zawierać 9 znaków')
		.max(9, 'Numer powinien zawierać 9 znaków'),
	inpost: Yup.string()
		.matches(inpostRegExp, 'Niepoprawny format')
		.required('Wprowadź kod paczkomatu')
		.min(5, 'Błędny kod')
		.max(10, 'Błędny kod'),
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
