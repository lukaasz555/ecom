import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { Link } from 'react-router-dom';

const Shop = () => {
	return (
		<Layout>
			<div className='flex flex-col lg:flex-row lg:justify-around lg:px-10 gap-x-5 py-10'>
				<article className='mb-10 lg: basis-[40%]'>
					<h3 className='text-2xl font-lato mb-7'>Witaj w someStore</h3>
					<p className='text-l font-lato font-light'>
						<strong className='font-lato'>someStore</strong> to mała, rodzinna
						firma, która powstała z naszej pasji do muzyki oraz literatury.
						<br />
						<br />
						Zaczynaliśmy od sprzedaży książek, jednak cały czas chcemy się
						rozwijać, więc od nie dawna w naszej ofercie dostępne są również
						albumy muzyczne. W tym momencie największą część oferty stanowią
						albumy z muzyką alternatywną oraz rockową, zapewniamy jednak, że
						będziemy cały czas poszerzać ofertę, aby sprostać oczekiwaniom
						najbardziej wymagających klientów.
						<br />
						<br />
						Zajmujemy się również sprowadzaniem książek oraz płyt, więc jeśli
						szukanego produktu nie ma na naszej stronie, zachęcamy do
						skorzystania z{' '}
						<Link to={`/contact`} className='text-brownSugar'>
							formularza kontaktowego.
						</Link>
					</p>
				</article>
				<section className='flex flex-col h-[100%] basis-[50%] relative'>
					<div className='shadow-xl'>
						<img
							src='https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
							alt=''
							className='h-[100%] w-auto object-cover'
						/>

						<div className='absolute left-0 top-0 h-[100%] w-[100%] bg-black opacity-0 hover:opacity-80 duration-150 flex justify-center items-center'>
							<div className='flex flex-col justify-between xl:flex-row xl:items-center xl:w-[100%] xl:justify-center xl:gap-x-10'>
								<Link
									to={`/shop/books`}
									className='group block uppercase  text-white relative text-2xl my-5 font-[300]'>
									zobacz książki
									<span className='absolute left-0 bottom-0 w-[100%] h-[1px] bg-white origin-left scale-x-0 group-hover:scale-x-100 duration-300'></span>
								</Link>

								<Link
									to={`/shop/albums`}
									className='group block uppercase text-white relative text-2xl my-5  font-[300]'>
									zobacz płyty
									<span className='absolute right-0 bottom-0 w-[100%] h-[1px] bg-white origin-right scale-x-0 group-hover:scale-x-100 duration-300'></span>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default Shop;
