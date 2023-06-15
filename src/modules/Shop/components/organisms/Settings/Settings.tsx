import React, { useState } from 'react';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import { useAppSelector } from '../../../../../hooks/hooks';
import CTA from '../../../../../components/shared/CTA/CTA';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import InputErrorMessage from '../../../../../components/shared/InputErrorMessage/InputErrorMessage';
import { userEdit } from '../../../../../features/user/userSlice';
import { ApiResponse } from '../../../../../models/api';
import { User } from '../../../../../models/User';

const Settings = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [isSuccess, setSuccess] = useState(false);
	const [isEditMode, setEditMode] = useState(false);
	const user = useAppSelector((state) => state.userReducer.user);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [formValues, setFormValues] = useState({
		name: user?.name || '',
		lastname: user?.lastname || '',
		email: user?.email || '',
		password: '',
	});

	function handleFormChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	}

	async function handleUpdateClick(): Promise<void> {
		if (user) {
			setLoading(true);
			const updatedUser = {
				...user,
				email: formValues.email,
				name: formValues.name,
				lastname: formValues.lastname,
				password: formValues.password,
			};
			await dispatch(userEdit(updatedUser))
				.then((res) => {
					const data = res.payload as ApiResponse<User>;
					setSuccess(false);
					setError(true);
					if (data.status === 200) {
						setError(false);
						setSuccess(true);
					}
				})
				.finally(() => setLoading(false));
		}
	}

	return (
		<>
			<div className='flex flex-col items-start mx-8'>
				<header className='flex justify-between items-center w-[100%]'>
					<h2 className='uppercase text-xl font-lato'>moje dane</h2>
					<button onClick={() => setEditMode(!isEditMode)}>zmień dane</button>
				</header>
				{user ? (
					<div>
						<div className='flex gap-x-4 mt-6 flex-wrap'>
							<div className='flex flex-col w-[300px]'>
								<GrayInput
									name='name'
									type='text'
									label='Imię'
									value={formValues.name}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => handleFormChange(e)}
									disabled={!isEditMode}
								/>
								<GrayInput
									name='lastname'
									type='text'
									label='Nazwisko'
									value={formValues.lastname}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => handleFormChange(e)}
									disabled={!isEditMode}
								/>
							</div>
							<div className='flex flex-col w-[300px]'>
								<GrayInput
									name='email'
									type='email'
									label='E-mail'
									value={formValues.email}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => handleFormChange(e)}
									disabled={!isEditMode}
								/>
							</div>
						</div>
						{isEditMode ? (
							<div className='flex flex-col w-[300px]'>
								<GrayInput
									name='password'
									type='password'
									label='Potwierdź hasło'
									value={formValues.password}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => handleFormChange(e)}
								/>

								<CTA
									body='zapisz zmiany'
									onClick={handleUpdateClick}
									isLoading={isLoading}
									size='small'
								/>
								{isError ? (
									<InputErrorMessage text='Aktualizacja nieudana. Spróbuj ponownie' />
								) : isSuccess ? (
									<div className='mt-2'>
										<p className='text-brownSugar text-[13px]'>
											Zaktualizowano profil
										</p>
									</div>
								) : null}
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</>
	);
};
export default Settings;
