import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Input from '../../shared/GrayInput/GrayInput';
import CTA from '../../atoms/CTA/CTA';
import axios from 'axios';
import { ProductModel } from '../../../models/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { handleAuthors } from '../../../helpers/handleAuthors';

type PWModalProps = {
	isOpen: boolean;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	idToReq: string | undefined;
	setMessage?: React.Dispatch<React.SetStateAction<string>>;
	getProducts?: () => Promise<void>;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	type: 'edit' | 'remove';
	product?: ProductModel;
	authors?: string;
};

const PasswordModal = ({
	isOpen,
	password,
	setPassword,
	idToReq,
	setMessage,
	getProducts,
	setModalOpen,
	type,
	product,
	authors,
}: PWModalProps) => {
	const [passwordMessage, setPasswordMessage] = useState('');
	const URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();

	const sendReq = (
		type: 'remove' | 'edit',
		id: string | unknown,
		password: string
	) => {
		if (type === 'edit' && product !== undefined && authors) {
			axios
				.put(`${URL}/products/edit/` + idToReq, {
					params: {
						id: idToReq,
					},
					password,
					price: +product.price,
					discount: +product.discount,
					title: product.title,
					authors: handleAuthors(authors),
					description: product.description,
				})
				.then((res) => {
					if (res.status === 200) {
						navigate(-1);
					}
				})
				.catch((err) => {
					setPassword('');
					setPasswordMessage('Hasło jest niepoprawne.');
				});
		}
		if (type === 'remove' && getProducts && setMessage) {
			axios
				.delete(`${URL}/products/remove/` + id, {
					params: {
						id: idToReq,
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
		}
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
            -translate-x-[50%] -translate-y-[50%] z-30'
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
				<CTA
					body='Potwierdź'
					onClick={() => sendReq(type, idToReq, password)}
				/>
				<p className='text-brownSugar mt-5'>
					{passwordMessage === '' ? null : passwordMessage}
				</p>
			</div>
		</ReactModal>
	);
};

export default PasswordModal;
