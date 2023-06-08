import React, { useState } from 'react';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import { useAppSelector } from '../../../../../hooks/hooks';
import CTA from '../../../../../components/shared/CTA/CTA';
import { edit } from '../../../../../services/user.service';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setUser } from '../../../../../features/user/userSlice';
import InputErrorMessage from '../../../../../components/shared/InputErrorMessage/InputErrorMessage';

const Settings = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [isEditMode, setEditMode] = useState(false);
	const user = useAppSelector((state) => state.userReducer.user);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	function handleUpdateClick(): void {
		setLoading(true);
		user &&
			edit(user)
				.then((res) => {
					if (res.data) {
						dispatch(setUser(res.data));
						setError(false);
					}
					if (res.status !== 200) {
						setError(true);
					}
				})
				.catch((e) => setError(true))
				.finally(() => setLoading(false));
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
									value={user.name}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => (user.name = e.target.value)}
									disabled={!isEditMode}
								/>
								<GrayInput
									name='lastname'
									type='text'
									label='Nazwisko'
									value={user.lastname}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => (user.lastname = e.target.value)}
									disabled={!isEditMode}
								/>
							</div>
							<div className='flex flex-col w-[300px]'>
								<GrayInput
									name='email'
									type='email'
									label='E-mail'
									value={user.email}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => (user.email = e.target.value)}
									disabled={!isEditMode}
								/>
								<GrayInput
									name='password'
									type='password'
									label='Hasło'
									value={user.password}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => (user.password = e.target.value)}
									disabled={!isEditMode}
								/>
							</div>
						</div>
						<div className='flex flex-col w-[300px]'>
							<CTA
								body='zapisz zmiany'
								onClick={handleUpdateClick}
								isLoading={isLoading}
							/>
							{isError ? (
								<InputErrorMessage text='Aktualizacja nieudana. Spróbuj ponownie' />
							) : null}
						</div>
					</div>
				) : null}
			</div>
		</>
	);
};
export default Settings;
