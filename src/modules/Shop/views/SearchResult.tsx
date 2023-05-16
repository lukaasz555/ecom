import React, { useEffect, useState } from 'react';
import Layout from '../components/templates/Layout/Layout';
import { ProductModel } from '../../../models/Product';
import { ProductTypesEnum } from '../../../enums/ProductTypesEnum';
import ItemCard from '../components/organisms/ItemCard/ItemCard';
import { useLocation } from 'react-router-dom';
import { getQueryParams } from '../../../helpers/getQueryParams';
import { searchProduct } from '../../../services/products.service';
import ErrorMessage from '../../../components/shared/ErrorMessage/ErrorMessage';
import Loader from '../../../components/shared/Loader/Loader';

interface SearchResultParams {
	key?: string;
	value?: string;
}

const SearchResult = () => {
	const [items, setItems] = useState<ProductModel[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [isError, setError] = useState(false);
	const location = useLocation();
	const [queryParams, setQueryParams] = useState<SearchResultParams>();

	useEffect(() => {
		const params = getQueryParams(location.search);
		setQueryParams(params);
		searchProduct(params)
			.then((res) => {
				if (res.data && res.status === 200) {
					setItems(res.data);
					setError(false);
				}
				if (res.status === 204) {
					setItems([]);
					setError(false);
				}
			})
			.catch((e) => setError(true))
			.finally(() => setLoading(false));
	}, [location.search]);

	return (
		<Layout>
			<div className='min-h-[40vh]'>
				{!isLoading ? (
					<h3 className='text-center text-xl font-[400] mt-[60px]'>
						Wyniki wyszukiwania dla:{' '}
						<span className='font-[500]'>{queryParams?.value}</span>
					</h3>
				) : (
					<h3 className='text-center text-xl font-[400] mt-[60px]'>
						Wyszukiwanie:{' '}
						<span className='font-[500]'>{queryParams?.value}</span>
					</h3>
				)}

				{isLoading ? (
					<div className='mt-[120px] flex justify-center'>
						<Loader />
					</div>
				) : (
					<div className='flex flex-wrap justify-center mt-[60px]'>
						{items.length === 0 && !isError ? (
							<div className='min-h-[200px] flex items-center'>
								<h1>Nie znaleziono produktów</h1>
							</div>
						) : !isError ? (
							items.map((x) => <ItemCard data={x} key={x.id} />)
						) : (
							<ErrorMessage text1='Brak połączenia' text2='Spróbuj ponownie' />
						)}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default SearchResult;
