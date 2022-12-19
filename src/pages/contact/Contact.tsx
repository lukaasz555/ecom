import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import ContactForm from '../../components/molecules/ContactForm/ContactForm';

const Contact = () => {
	return (
		<Layout>
			<div className='flex flex-col lg:flex-row lg:justify-between lg:px-10 gap-x-5 py-10'>
				<article className='mb-10 lg: basis-[40%]'>
					<h3 className='text-2xl font-lato mb-7'>Skontaktuj się z nami</h3>
					<p className='text-l font-lato font-[300]'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
						atque veniam tempore distinctio neque sit iste error, velit
						repudiandae facilis ducimus numquam voluptates mollitia deserunt
						iure nihil aperiam labore qui? Doloremque magni aut modi quibusdam
						rem?
						<br />
						<br />
						<div>
							<p className='text-l font-lato font-[300] mb-5'>
								Oprócz formularza kontaktowego można się z nami skontaktować za
								pomocą:
							</p>
							<div className='flex flex-col'>
								<a
									href={`mailto:example@example.com`}
									className='text-brownSugar font-[300] mb-1'>
									example@example.com
								</a>

								<a
									href={`tel:731094748`}
									className='text-brownSugar font-[300]'>
									+48731094748
								</a>
							</div>
						</div>
					</p>
				</article>
				<ContactForm />
			</div>
		</Layout>
	);
};

export default Contact;
