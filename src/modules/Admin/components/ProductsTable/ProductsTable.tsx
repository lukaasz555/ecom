import React from 'react';
import AdminProductItem from '../AdminProductItem/AdminProductItem';
import { ProductModel } from '../../../../models/Product';

type ProductsTableProps = {
	products: ProductModel[];
	removeProduct: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ProductsTable = ({ products, removeProduct }: ProductsTableProps) => {
	return (
		<>
			{products.length === 0 ? (
				<p>Brak produktów do wyświetlenia</p>
			) : (
				<table>
					<thead>
						<tr className='border-b-[1px] text-left'>
							<th className='font-medium w-[50px]'>ID</th>
							<th className='font-medium'>TYTUŁ</th>
							<th className='font-medium text-center w-[70px]'>CENA</th>
							<th className='font-medium text-center w-[80px]'>RODZAJ</th>
							<th className='font-medium w-[60px]'></th>
						</tr>
					</thead>
					<tbody>
						{products.map((p) => (
							<AdminProductItem
								product={p}
								key={p.id}
								removeProduct={removeProduct}
							/>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default ProductsTable;
