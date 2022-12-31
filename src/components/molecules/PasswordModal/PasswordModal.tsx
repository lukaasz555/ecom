import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Input from '../../atoms/GrayInput/GrayInput';
import CTA from '../../atoms/CTA/CTA';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

type PWModalProps = {
	isOpen: boolean;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	idToRemove: string | undefined;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	getProducts: () => Promise<void>;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordModal = ({
	isOpen,
	password,
	setPassword,
	idToRemove,
	setMessage,
	getProducts,
	setModalOpen,
}: PWModalProps) => {
	const [passwordMessage, setPasswordMessage] = useState('');
	const axiosInstance = axios.create({ baseURL: process.env.API_URL });

	const sendReq = (id: string | unknown, password: string) => {
		axiosInstance
			.delete('/products/remove/' + id, {
				params: {
					id: idToRemove,
				},
				data: {
					password,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					setMessage(`Usunięto produkt.`);
					getProducts();
					setModalOpen(false);
					setPasswordMessage('');
					setPassword('');
				}
			})
			.catch((err) => {
				setPassword('');
				setPasswordMessage('Hasło jest niepoprawne.');
			});
	};

	const closeModal = () => {
		setPassword('');
		setPasswordMessage('');
		setModalOpen(false);
	};

	return (
		<ReactModal
			isOpen={isOpen}
			className='flex justify-center items-center border-[1px] w-[350px] mx-auto absolute left-[50%] top-[50%]
            -translate-x-[50%] -translate-y-[50%]'
			onRequestClose={closeModal}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			appElement={document.getElementsByTagName('div.root')}
			style={{
				content: {
					backgroundColor: 'rgba(255,255,255,1)',
					borderRadius: '8px',
					outline: 'black',
				},
				overlay: {
					backgroundColor: 'rgba(255,255,255,0.95)',
				},
			}}>
			<div className='w-[300px] flex flex-col items-center relative py-10 px-10'>
				<button className='absolute right-0 top-2' onClick={closeModal}>
					<FontAwesomeIcon icon={faX} />
				</button>
				<label className='mb-2'>Podaj hasło:</label>
				<Input
					label=''
					name='password'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<CTA body='Potwierdź' onClick={() => sendReq(idToRemove, password)} />
				<p className='text-brownSugar mt-5'>
					{passwordMessage === '' ? null : passwordMessage}
				</p>
			</div>
		</ReactModal>
	);
};

export default PasswordModal;
