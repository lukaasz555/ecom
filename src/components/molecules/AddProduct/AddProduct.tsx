import React, { useState } from 'react';
import WhiteInput from '../../atoms/WhiteInput/WhiteInput';
import axios from 'axios';
import CTA from '../../atoms/CTA/CTA';
import { ProductModel } from '../../../models/Product';
import Textfield from '../../atoms/Textfield/Textfield';

interface AddProductProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct = ({ setOpen }: AddProductProps) => {
	const id = crypto.randomUUID().slice(0, 3);
	const [authors, setAuthors] = useState('');
	const [newProduct, setNewProduct] = useState<ProductModel>({
		id,
		title: '',
		authors: [''],
		releaseYear: '',
		description: '',
		img: 'https://ecsmedia.pl/b/mp/img/defaults/w.gif',
		thumbnail: '',
		price: 0,
		discount: 0,
		categoryID: 0,
		format: '',
		type: 'books',
		publisher: '',
		label: '',
		language: '',
		pages: 0,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const checkForm = (product: ProductModel) => {
		if (
			product.title !== '' &&
			product.title.length >= 2 &&
			product.categoryID !== 0
		) {
			return true;
		}

		return false;
	};

	const handleAuthors = (str: string) => {
		const arr = str.split(',');
		return arr.map((item) => item.trim());
	};

	const handleClick = () => {
		newProduct.authors = handleAuthors(authors);
		if (checkForm(newProduct)) {
			axios.post('http://localhost:1337/products/add', newProduct);
			setOpen(false);
			console.log(newProduct);
		}
	};

	return (
		<div className='flex flex-col gap-y-3'>
			<div className='flex items-center gap-x-2'>
				<label>Rodzaj produktu</label>
				<select
					name='type'
					onChange={handleChange}
					value={newProduct.type}
					className='border-[1px] px-1 py-0.5'>
					<option value='books'>książka</option>
					<option value='albums'>płyta</option>
				</select>
			</div>
			<div>
				<WhiteInput
					type='text'
					value={newProduct.title}
					name='title'
					placeholder='Tytuł'
					onChange={handleChange}
					required={true}
				/>
			</div>
			<div>
				<WhiteInput
					type='text'
					value={authors}
					placeholder='Autor'
					onChange={(e) => setAuthors(e.target.value)}
					required={true}
				/>
			</div>
			<div>
				<WhiteInput
					type='text'
					value={newProduct.releaseYear}
					name='releaseYear'
					placeholder='Rok wydania'
					onChange={handleChange}
					required={true}
				/>
			</div>

			<div>
				<label>Cena</label>
				<WhiteInput
					type='number'
					value={newProduct.price}
					name='price'
					placeholder='Cena'
					onChange={handleChange}
					required={true}
				/>
			</div>

			<div>
				<label>Zniżka</label>
				<WhiteInput
					type='number'
					value={newProduct.discount}
					name='discount'
					placeholder='Wpisz o ile chcesz obniżyć cenę (np. 5.50)'
					onChange={handleChange}
				/>
			</div>

			<div className='flex gap-x-2 items-center'>
				<label>Kategoria produktu</label>
				<select
					value={newProduct.categoryID}
					onChange={handleChange}
					name='categoryID'
					className='border-[1px]  px-1 py-0.5'>
					{newProduct.type === 'books' ? (
						<>
							<option disabled>--- książki ---</option>
							<option value={19}>literatura piękna</option>
							<option value={10}>literatura faktu</option>
							<option value={13}>biografie</option>
							<option value={17}>finanse</option>
							<option value={22}>kryminał</option>
							<option value={26}>rozwój</option>
						</>
					) : (
						<>
							<option disabled>--- muzyka ---</option>
							<option value={44}>alternatywa</option>
							<option value={45}>rock</option>
							<option value={41}>rap</option>
							<option value={39}>pop</option>
						</>
					)}
				</select>
			</div>

			<div>
				<label>Format</label>
				<WhiteInput
					placeholder='Płyta CD / Książka (twarda, miękka okładka)'
					name='format'
					value={newProduct.format}
					onChange={handleChange}
					type='text'
					required={true}
				/>
			</div>

			<div>
				{newProduct.type === 'books' ? (
					<div className='flex flex-col gap-y-2'>
						<WhiteInput
							type='text'
							name='publisher'
							value={newProduct.publisher}
							onChange={handleChange}
							placeholder='Wydawnictwo'
						/>

						<WhiteInput
							type='text'
							name='language'
							value={newProduct.language}
							onChange={handleChange}
							placeholder='Język wydania'
						/>

						<div>
							<label>Liczba stron</label>
							<WhiteInput
								type='number'
								name='pages'
								value={newProduct.pages}
								onChange={handleChange}
								placeholder='Liczba stron'
							/>
						</div>
					</div>
				) : (
					<div>
						<WhiteInput
							name='label'
							value={newProduct.label}
							type='text'
							placeholder='Wytwórnia'
							onChange={handleChange}
						/>
					</div>
				)}
			</div>

			<div>
				<WhiteInput
					type='text'
					value={newProduct.img}
					name='img'
					placeholder='Link do zdjęcia'
					onChange={handleChange}
					required={true}
				/>
			</div>

			<div>
				<WhiteInput
					type='text'
					value={newProduct.thumbnail}
					name='thumbnail'
					placeholder='Link do miniaturki'
					onChange={handleChange}
					required={true}
				/>
			</div>

			<div className='mt-2'>
				<label>Opis produktu:</label>
				<Textfield newProduct={newProduct} setNewProduct={setNewProduct} />
			</div>
			<CTA body='dodaj produkt' onClick={handleClick} />
		</div>
	);
};

export default AddProduct;
