import React from 'react';
import Modal from 'react-modal';
import { OrderModel } from '../../../models/Order';
import OrderItemDetails from '../Admin/OrderItem/OrderItemDetails';

interface OrderModalProps {
	closeModal: () => void;
	showModal: boolean;
	isModalOpen: boolean;
	order: OrderModel | undefined;
}

const OrderModal = ({
	closeModal,
	showModal,
	order,
	isModalOpen,
}: OrderModalProps) => {
	return (
		<Modal
			isOpen={showModal}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			onRequestClose={closeModal}
			style={{
				overlay: {
					backgroundColor: 'rgba(255,255,255,0.8)',
					height: '100%',
				},
				content: {
					backgroundColor: 'rgba(255,255,255,0.8)',
					border: 'none',
				},
			}}>
			<div className='h-[100%]'>
				{order && (
					<div className='flex flex-col items-center justify-center'>
						<OrderItemDetails open={isModalOpen} order={order} />
						<button
							className='uppercase hover:underline mt-5'
							onClick={closeModal}>
							zamknij
						</button>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default OrderModal;
