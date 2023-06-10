import React, { useEffect, useState } from 'react';
import CategoryButton from '../../atoms/CategoryButton/CategoryButton';
import { useParams } from 'react-router-dom';
import { fetchCategories } from '../../../../../services/products.service';

const CategoriesMenu = () => {
	const [items, setItems] = useState<number[]>([]);
	const { category } = useParams();

	useEffect(() => {
		if (category) {
			fetchCategories(category).then((res) => {
				if (res.data) {
					setItems(res.data);
				}
			});
		}
	}, [category]);

	return (
		<nav className='my-10 flex items-start flex-col xl:flex-row  xl:justify-center xl:flex-wrap xl:gap-3'>
			{Array.isArray(items) ? (
				items.map((cat) => (
					<CategoryButton
						key={cat}
						cat={Number(cat)}
						to={`/shop/products/${category}/${cat}`}
					/>
				))
			) : (
				<p>nima</p>
			)}
		</nav>
	);
};

export default CategoriesMenu;
