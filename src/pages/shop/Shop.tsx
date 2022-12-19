import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { Link } from 'react-router-dom';

const Shop = () => {
	return (
		<Layout>
			<div className='flex flex-col lg:flex-row lg:justify-around lg:px-10 gap-x-5 py-10'>
				<article className='mb-10 lg: basis-[40%]'>
					<h3 className='text-2xl font-lato mb-7'>Witaj w someStore</h3>
					<p className='text-[16px] font-lato font-light'>
						<strong className='font-lato'>someStore</strong> to mała, rodzinna
						firma, która powstała z naszej pasji do muzyki oraz literatury.
						<br />
						<br />
						Zaczynaliśmy od sprzedaży książek, najpierw stacjonarnie, prowadząc
						małą księgarnię, jednak ze względu na pandemię COVID-19
						zdecydowaliśmy przenieść naszą działalność w stu procentach do
						internetu.
						<br />
						<br />
						Od niedawna w naszym sklepie mogą Państwo kupić również albumy
						muzyczne. W tym momencie największą część oferty stanowią albumy z
						muzyką alternatywną oraz rockową, zapewniamy jednak, że będziemy
						cały czas poszerzać ofertę, aby sprostać oczekiwaniom najbardziej
						wymagających klientów.
						<br />
						<br />
						Zajmujemy się również sprowadzaniem książek oraz płyty, więc jeśli
						szukanego produktu nie ma na naszej stronie, zachęcamy do
						skorzystania z{' '}
						<Link to={`/contact`} className='text-brownSugar'>
							{' '}
							formularza kontaktowego.
						</Link>
					</p>
				</article>
				<section className='flex flex-col h-[100%] basis-[50%]'>
					<div className=' shadow-xl'>
						<img
							src='https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
							alt=''
							className='h-[100%] w-auto object-cover'
						/>

						<div className='absolute left-0 top-0 h[100%] w-[100%] bg-blush opacity-50'></div>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default Shop;
