import React from 'react';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import { loginValidation } from '../../../../../helpers/validations';
import { useFormik } from 'formik';
import CTA from '../../../../../components/shared/CTA/CTA';

const LoginForm = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: loginValidation,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		formik.handleSubmit();
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<GrayInput
				type='email'
				label='E-mail:'
				name='email'
				onChange={formik.handleChange}
				value={formik.values.email}
				error={formik.errors.email}
			/>
			<GrayInput
				type='password'
				label='Hasło:'
				name='password'
				onChange={formik.handleChange}
				value={formik.values.password}
				error={formik.errors.password}
			/>
			<CTA body='Zaloguj się' type='submit' onClick={handleClick} />
		</form>
	);
};

export default LoginForm;
