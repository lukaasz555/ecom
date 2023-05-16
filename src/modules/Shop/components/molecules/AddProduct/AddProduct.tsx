import React, { useState } from 'react';
import WhiteInput from '../../../../../components/shared/WhiteInput/WhiteInput';
import CTA from '../../../../../components/shared/CTA/CTA';
import { ProductModel } from '../../../../../models/Product';
import Textfield from '../../../../../components/shared/Textfield/Textfield';
import { handleAuthors } from '../../../../../helpers/handleAuthors';
import { addProduct } from '../../../../../services/products.service';
import { initialProductModel } from '../../../../../helpers/initialStates';

interface AddProductProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	getProducts: () => Promise<void>;
}

const AddProduct = ({ setOpen, setMessage, getProducts }: AddProductProps) => {
	const [authors, setAuthors] = useState('');
	const [error, setError] = useState('');
	const [newProduct, setNewProduct] =
		useState<ProductModel>(initialProductModel);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const checkForm = (product: ProductModel) => {
		if (
			newProduct.title !== '' &&
			newProduct.title.length >= 2 &&
			newProduct.categoryID !== 0 &&
			newProduct.releaseYear.length === 4 &&
			newProduct.price >= newProduct.discount
		) {
			return true;
		}
		return false;
	};

	const handleClick = () => {
		newProduct.price = +newProduct.price;
		newProduct.discount = +newProduct.discount;
		newProduct.authors = handleAuthors(authors);
		if (checkForm(newProduct)) {
			addProduct(newProduct)
				.then(() => {
					setOpen(false);
					setMessage('Dodano nowy produkt');
					setError('');
					getProducts();
				})
				.catch((e) => {
					setError('Sth went wrong...');
				});
		} else {
			setError('Wypełnij poprawnie formularz.');
		}
	};

	return (
		<div className='flex flex-col gap-y-6'>
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
				<p className='text-s'>
					{newProduct.authors[0].length === 0
						? 'W przypadku kilku autorów rozdziel ich nazwiska przecinkami'
						: null}
				</p>
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
				<p className='text-s'>
					{newProduct.releaseYear.length !== 4
						? 'Podaj rok wydania (np. 1999, 2010)'
						: null}
				</p>
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
				<p>
					{newProduct.discount > newProduct.price
						? 'Zniżka nie może być wyższa od ceny'
						: null}
				</p>
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
							<option defaultChecked>wybierz z listy</option>
							<option value={19}>literatura piękna</option>
							<option value={10}>literatura faktu</option>
							<option value={13}>biografie</option>
							<option value={17}>finanse</option>
							<option value={22}>kryminał</option>
							<option value={26}>rozwój</option>
						</>
					) : (
						<>
							<option defaultChecked>wybierz z listy</option>
							<option value={44}>alternatywa</option>
							<option value={45}>rock</option>
							<option value={41}>rap</option>
							<option value={39}>pop</option>
						</>
					)}
				</select>
				<p>{newProduct.categoryID === 0 ? 'Wybierz kategorię' : null}</p>
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
				<label>
					Miniaturka{' '}
					<span className='text-s'>
						(jeśli nie masz, podaj 2 razy link do okładki)
					</span>{' '}
				</label>
				<WhiteInput
					type='text'
					value={newProduct.thumbnail}
					name='thumbnail'
					placeholder='Link do miniaturki'
					onChange={handleChange}
					required={true}
				/>
			</div>

			<div>
				<label>Link do zdjęcia okładki</label>
				<WhiteInput
					type='text'
					value={newProduct.img}
					name='img'
					placeholder='Link do zdjęcia'
					onChange={handleChange}
					required={true}
				/>
			</div>

			<div className='mt-2'>
				<label>Opis produktu:</label>
				<Textfield newProduct={newProduct} setNewProduct={setNewProduct} />
			</div>
			<div>{error && <p className='text-brownSugar'>{error}</p>}</div>
			<CTA body='dodaj produkt' onClick={handleClick} />
		</div>
	);
};

export default AddProduct;
