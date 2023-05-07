import React, { useEffect, useState } from 'react';
import CategoryButton from '../../atoms/CategoryButton/CategoryButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoriesMenu = () => {
	const [items, setItems] = useState<number[]>([]);
	const { category } = useParams();

	const fetchCategoriesFromStore = async () => {
		const res = await axios
			.get(`${process.env.REACT_APP_SERVER_URL}/products/categories`, {
				params: {
					category,
				},
			})
			.then((res) => {
				setItems(res.data);
				return res.data;
			})
			.catch((e) => console.error(e));
		return res;
	};

	useEffect(() => {
		fetchCategoriesFromStore();
	}, [category]);

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
