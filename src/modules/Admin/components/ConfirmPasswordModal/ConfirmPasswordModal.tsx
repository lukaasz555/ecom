import React, { useState } from 'react';
import ReactModal from 'react-modal';
import GrayInput from '../../../../components/shared/GrayInput/GrayInput';
import CTA from '../../../../components/shared/CTA/CTA';
import { ProductModel } from '../../../../models/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import {
	deleteProduct,
	updateProduct,
} from '../../../../services/products.service';
import Loader from '../../../../components/shared/Loader/Loader';
import { ModalActionTypesEnum } from '../../../../enums/ModalActionTypesEnum';

type ConfirmPasswordModalProps = {
	isOpen: boolean;
	idToReq: string | undefined;
	getProducts?: () => void;
	type: ModalActionTypesEnum;
	product?: ProductModel;
	authors?: string;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmPasswordModal = ({
	isOpen,
	idToReq,
	getProducts,
	setModalOpen,
	type,
	product,
	authors,
}: ConfirmPasswordModalProps) => {
	const [isLoading, setLoading] = useState(false);
	const [isButtonVisible, setButtonVisible] = useState(true);
	const [modalMessage, setModalMessage] = useState('');
	const [password, setPassword] = useState('');

	const closeModal = () => {
		setPassword('');
		setModalMessage('');
		setModalOpen(false);
	};

	const modalSuccess = () => {
		setButtonVisible(false);
		setTimeout(() => {
			closeModal();
			setButtonVisible(true);
		}, 2000);
	};

	const sendReq = (
		type: ModalActionTypesEnum,
		id: string | unknown,
		password: string
	) => {
		if (password.trim() === '') {
			setModalMessage('Wpisz hasło');
		} else {
			if (type === ModalActionTypesEnum.Remove && getProducts) {
				if (idToReq) {
					setLoading(true);
					deleteProduct({
						id: idToReq,
						password,
					})
						.then((res) => {
							if (res.status === 200) {
								setModalMessage('Usunięto produkt');
								getProducts();
								modalSuccess();
							}
						})
						.catch((e) => {
							setPassword('');
							setModalMessage('Hasło jest niepoprawne.');
						})
						.finally(() => setLoading(false));
				}
			}
			if (
				type === ModalActionTypesEnum.Edit &&
				product !== undefined &&
				authors
			) {
				if (idToReq) {
					setLoading(true);
					setModalMessage('');
					updateProduct({
						id: idToReq,
						password: password,
						price: +product.price,
						discount: +product.discount,
						title: product.title,
						authors: product.authors,
						description: product.description,
					})
						.then(({ status }) => {
							if (status === 200) {
								setModalMessage('Aktualizacja udana');
								modalSuccess();
							}
							if (status === 401) {
								setModalMessage('Błędne hasło');
							}
						})
						.catch((e) => {
							setModalMessage('Coś poszło nie tak');
							console.error(e);
						})
						.finally(() => setLoading(false));
				}
			}
		}
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
				{isButtonVisible ? (
					<CTA
						body='Potwierdź'
						onClick={() => sendReq(type, idToReq, password)}
					/>
				) : isLoading ? (
					<Loader />
				) : null}

				<p className='text-brownSugar mt-5'>
					{modalMessage === '' ? null : modalMessage}
				</p>
			</div>
		</ReactModal>
	);
};

export default ConfirmPasswordModal;
