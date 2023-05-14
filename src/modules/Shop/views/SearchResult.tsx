import React from 'react';
import Layout from '../components/templates/Layout/Layout';
import { ProductModel } from '../../../models/Product';
import { ProductTypesEnum } from '../../../enums/ProductTypesEnum';
import ItemCard from '../components/organisms/ItemCard/ItemCard';

const SearchResult = () => {
	const mockResults: ProductModel[] = [
		{
			id: 'f5c',
			categoryID: 39,
			description: '',
			authors: ['David Bowie'],
			discount: 0,
			format: 'Płyta CD',
			price: 98,
			pages: 0,
			img: 'https://ecsmedia.pl/c/heroes-w-iext109187201.jpg',
			label: 'Pomaton EMI',
			releaseYear: '1999',
			title: 'Heroes',
			type: ProductTypesEnum.Album,
			thumbnail: 'https://ecsmedia.pl/c/heroes-w-iext109187201.jpg',
		},
	];

	return (
		<Layout>
			<div className=''>
				<h3 className='text-center text-xl font-[400]'>
					Wyniki wyszukiwania dla:{' '}
					<span className='font-[500]'>David Bowie</span>
				</h3>
				<div className='flex flex-wrap justify-center mt-[60px]'>
					{mockResults.map((x) => (
						<ItemCard data={x} key={x.id} />
					))}
				</div>
			</div>
		</Layout>
	);
};

export default SearchResult;
