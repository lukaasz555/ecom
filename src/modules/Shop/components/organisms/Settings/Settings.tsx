import React, { useEffect, useState } from 'react';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import { useAppSelector } from '../../../../../hooks/hooks';
import CTA from '../../../../../components/shared/CTA/CTA';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { userEdit } from '../../../../../features/user/userSlice';
import { resetMessage } from '../../../../../features/user/userSlice';

const Settings = () => {
	const loading = useAppSelector((state) => state.userReducer.isLoading);
	const stateMessage = useAppSelector((state) => state.userReducer.message);
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
			const updatedUser = {
				...user,
				email: formValues.email,
				name: formValues.name,
				lastname: formValues.lastname,
				password: formValues.password,
			};
			await dispatch(userEdit(updatedUser));
		}
	}

	useEffect(() => {
		dispatch(resetMessage());
	}, [window.location.href]);

	return (
		<>
			<div className='flex flex-col items-center md:items-start mx-8'>
				<header className='flex flex-col md:flex-row md:justify-between items-center w-[100%]'>
					<h2 className='uppercase text-xl font-lato'>moje dane</h2>
					<button onClick={() => setEditMode(!isEditMode)}>zmień dane</button>
				</header>
				{user ? (
					<div>
						<div className='flex gap-x-4 mt-6 flex-wrap'>
							<div className='flex flex-col w-[100%] md:w-[300px]'>
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
							<div className='flex flex-col w-[100%] md:w-[300px]'>
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
							<div className='flex flex-col w-[100%] md:w-[300px]'>
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
									isLoading={loading}
									size='small'
								/>
								<div className='mt-2'>
									<p className='text-brownSugar text-[13px]'>{stateMessage}</p>
								</div>
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</>
	);
};
export default Settings;
