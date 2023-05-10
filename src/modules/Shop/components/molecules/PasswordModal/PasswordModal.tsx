import React, { useState } from 'react';
import ReactModal from 'react-modal';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import CTA from '../../../../../components/shared/CTA/CTA';
import { ProductModel } from '../../../../../models/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { deleteProduct } from '../../../../../services/products.service';

type PWModalProps = {
	isOpen: boolean;
	password: string;
	idToReq: string | undefined;
	getProducts?: () => void;
	type: 'edit' | 'remove';
	product?: ProductModel;
	authors?: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	setMessage?: React.Dispatch<React.SetStateAction<string>>;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

	const sendReq = (
		type: 'remove' | 'edit',
		id: string | unknown,
		password: string
	) => {
		if (type === 'remove' && getProducts && setMessage) {
			if (idToReq) {
				deleteProduct({
					id: idToReq,
					password,
				})
					.then((res) => {
						if (res.status === 200) {
							setMessage('Produkt usunięty');
							getProducts();
							setModalOpen(false);
							setPasswordMessage('');
							setPassword('');
						}
					})
					.catch((e) => {
						setPassword('');
						setPasswordMessage('Hasło jest niepoprawne.');
					});
			}
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
				<GrayInput
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
