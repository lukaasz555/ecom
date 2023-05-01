import React, { useEffect, useState } from 'react';
import CategoryButton from '../../atoms/CategoryButton/CategoryButton';
import { getCategories } from '../../../helpers/getCategories';
import axios from 'axios';
import { handleCategoryNames } from '../../../helpers/handleCategoryNames';

type CategoriesMenuProps = {
	category?: string;
};

const CategoriesMenu = ({ category }: CategoriesMenuProps) => {
	const [items, setItems] = useState<number[]>([]);

	const fetchCategoriesFromStore = async () => {
		const res = await axios
			.get(`${process.env.REACT_APP_SERVER_URL}/products/categories`, {
				params: {
					category,
				},
			})
			.then((res) => {
				console.log(res.data);
				setItems(res.data);
				return res.data;
			})
			.catch((e) => console.log(e));
		return res;
	};

	useEffect(() => {
		fetchCategoriesFromStore();
	}, []);

	return (
		<nav className='my-10 flex items-start flex-col xl:flex-row  xl:justify-center xl:flex-wrap xl:gap-3'>
			{items.map((cat) => (
				<CategoryButton
					key={cat}
					cat={Number(cat)}
					to={`/shop/products/${category}/${cat}`}
				/>
			))}
		</nav>
	);
};

export default CategoriesMenu;
