import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import ContactForm from '../../components/molecules/ContactForm/ContactForm';

const Contact = () => {
	return (
		<Layout>
			<div className='flex flex-col lg:flex-row lg:justify-between lg:px-10 gap-x-5 py-10'>
				<article className='lg: basis-[40%]'>
					<h3 className='text-2xl font-lato mb-7'>Skontaktuj się z nami</h3>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
						atque veniam tempore distinctio neque sit iste error, velit
						repudiandae facilis ducimus numquam voluptates mollitia deserunt
						iure nihil aperiam labore qui? Doloremque magni aut modi quibusdam
						rem?
						<br />
						<br />
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Consequuntur odio aliquid aut.
					</p>
				</article>
				<ContactForm />
			</div>
		</Layout>
	);
};

export default Contact;
