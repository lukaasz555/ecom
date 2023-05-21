import React from 'react';
import Modal from 'react-modal';

interface IProductModal {
	img: string;
	title: string;
	closeModal: () => void;
	showModal: boolean;
}

const ProductModal = ({ img, title, closeModal, showModal }: IProductModal) => {
	return (
		<Modal
			isOpen={showModal}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			onRequestClose={closeModal}
			appElement={document.getElementsByTagName('div.root')}
			style={{
				overlay: {
					backgroundColor: 'rgba(255,255,255,0.8)',
					height: '100%',
				},
				content: {
					backgroundColor: 'rgba(255,255,255,0.8)',
					border: 'none',
				},
			}}
			contentLabel={`${title} cover`}>
			<div className='h-[100%]'>
				<div className='flex flex-col items-center justify-center w-full h-[100%]'>
					<img src={img} alt={title} />
					<button
						className='uppercase hover:underline mt-5'
						onClick={closeModal}>
						zamknij
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ProductModal;
