import React from 'react';
import Layout from '../components/templates/Layout/Layout';
import ContactForm from '../components/molecules/ContactForm/ContactForm';

const Contact = () => {
	return (
		<Layout>
			<div className='flex flex-col lg:flex-row lg:justify-between lg:px-10 gap-x-5 py-10'>
				<article className='mb-10 lg: basis-[40%]'>
					<h3 className='text-2xl font-lato mb-7'>Skontaktuj się z nami</h3>
					<p className='text-l font-lato font-[300]'>
						Chcesz zapytać o dostępność konkretnego produktu lub uzyskać
						informacje na temat swojego zamówienia? Skorzystaj z wybranej formy
						kontaktu. Warto podać jak najwięcej kluczowych informacji, takich
						jak np. numer zamówienia, szczegółowe dane produktu, którego szukasz
						(tytuł, wydawnictwo, rok, itd.) To zdecydowanie skróci czas
						oczekiwania na odpowiedź.
					</p>
					<br />
					<div>
						<p className='text-l font-lato font-[300] mb-5'>
							Oprócz formularza kontaktowego można się z nami skontaktować za
							pomocą:
						</p>
						<a
							href={`mailto:example@example.com`}
							className='text-brownSugar font-[300] mb-1'>
							example@example.com
						</a>
						<br />
						<a href={`tel:123456789`} className='text-brownSugar font-[300]'>
							+48 123456789
						</a>
					</div>
				</article>
				<ContactForm />
			</div>
		</Layout>
	);
};

export default Contact;
