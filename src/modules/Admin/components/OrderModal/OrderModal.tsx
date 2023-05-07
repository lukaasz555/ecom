import React from 'react';
import Modal from 'react-modal';
import { OrderModel } from '../../../../models/Order';
import OrderItemDetails from '../OrderItem/OrderItemDetails';

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
				},
				content: {
					backgroundColor: 'rgba(255,255,255,0.8)',
					maxWidth: '760px',
					padding: '0',
					maxHeight: '500px',
					marginLeft: 'auto',
					marginRight: 'auto',
					display: 'flex',
					alignItems: 'center',
				},
			}}>
			<div className='max-w-[760px] w-[100%] ml-auto mr-auto'>
				{order && (
					<div className='flex flex-col items-center justify-center'>
						<OrderItemDetails
							open={isModalOpen}
							order={order}
							closeModal={closeModal}
						/>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default OrderModal;
