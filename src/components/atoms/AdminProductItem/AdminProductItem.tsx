import React from 'react';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from '../../../models/Product';
import { Link } from 'react-router-dom';

type AdminProductProps = {
	p: ProductModel;
	removeProduct: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AdminProductItem = ({ p, removeProduct }: AdminProductProps) => {
	return (
		<div
			key={p.id}
			className='flex w-full odd:bg-white even:bg-gray items-center text-s'>
			<div className='basis-[15%]'>{p.id}</div>
			<div className='basis-[40%]'>{p.title}</div>
			<div className='basis-[15%] text-center'>
				{handleNumbFormat(p.price - p.discount)}
			</div>
			<div className='basis-[15%] text-center'>{p.type}</div>
			<div className='basis-[15%] flex justify-center gap-x-2'>
				<Link to={`/admin/products/edit/${p.id}`}>
					<FontAwesomeIcon icon={faPenToSquare} id={p.id} />
				</Link>

				<button id={p.id} onClick={removeProduct}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</div>
	);
};

export default AdminProductItem;
