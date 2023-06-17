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

export const invoiceValidation = Yup.object({
	name: Yup.string().required('To pole jest obowiązkowe'),
	lastname: Yup.string().required('To pole jest obowiązkowe'),
	address1: Yup.string().required('Uzupełnij adres'),
	address2: Yup.string().notRequired(),
	city: Yup.string().required('Podaj miasto'),
	postalCode: Yup.string()
		.required('Wymagane pole')
		.min(6, 'Podaj kod w formacie XX-XXX')
		.max(6, 'Podaj kod w formacie XX-XXX'),
	country: Yup.string().required(),
	isInvoice: Yup.boolean(),

	nip: Yup.string().when('isInvoice', {
		is: true,
		then: () => Yup.string().required('Numer NIP jest wymagany'),
		otherwise: () => Yup.string().notRequired(),
	}),
	companyName: Yup.string().when('isInvoice', {
		is: true,
		then: () => Yup.string().required('Nazwa firmy jest wymagana'),
		otherwise: () => Yup.string().notRequired(),
	}),
});
