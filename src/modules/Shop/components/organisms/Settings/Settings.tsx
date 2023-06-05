import React from 'react';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import { useAppSelector } from '../../../../../hooks/hooks';
import CTA from '../../../../../components/shared/CTA/CTA';

const Settings = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	return (
		<>
			<div className='flex flex-col items-start mx-8'>
				<header className='flex justify-between items-center w-[100%]'>
					<h2 className='uppercase text-xl font-lato'>moje dane</h2>
					<button>zmień dane</button>
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
									disabled
								/>
								<GrayInput
									name='lastname'
									type='text'
									label='Nazwisko'
									value={user.lastname}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => (user.lastname = e.target.value)}
									disabled
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
									disabled
								/>
								<GrayInput
									name='password'
									type='password'
									label='Hasło'
									value={user.password}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => (user.password = e.target.value)}
									disabled
								/>
							</div>
						</div>
						<div className='flex flex-col w-[300px]'>
							<CTA disabled body='zapisz zmiany' />
						</div>
					</div>
				) : null}
			</div>
		</>
	);
};
export default Settings;
