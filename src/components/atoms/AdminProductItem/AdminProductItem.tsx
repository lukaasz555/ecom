import React from 'react';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from '../../../models/Product';
import { Link } from 'react-router-dom';

type AdminProductProps = {
	product: ProductModel;
	removeProduct: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AdminProductItem = ({ product, removeProduct }: AdminProductProps) => {
	return (
		<tr
			key={product.id}
			className='odd:bg-white even:bg-gray text-m hover:outline hover:outline-1 hover:outline-brownSugar'>
			<td className='w-[50px]'>{product.id}</td>
			<td>{product.title}</td>
			<td className='text-center w-[70px]'>
				{handleNumbFormat(product.price - product.discount)}
			</td>
			<td className='text-center  w-[80px]'>{product.type}</td>
			<td className='w-[60px]'>
				<div className='basis-[15%] flex justify-center gap-x-2'>
					<Link to={`/admin/products/edit/${product.id}`}>
						<FontAwesomeIcon icon={faPenToSquare} id={product.id} />
					</Link>

					<button id={product.id} onClick={removeProduct}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			</td>
		</tr>
	);
};

export default AdminProductItem;
