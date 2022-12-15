import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ArrowToTop = () => {
	const toTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	// <div class="animate-[wiggle_1s_ease-in-out_infinite]">

	return (
		<button
			className={`fixed right-5 bottom-0 bg-black px-2 py-2 animate-[fromBottom_.3s_linear_1]`}
			onClick={toTop}>
			<FontAwesomeIcon icon={faChevronUp} color='#fff' className='text-xl' />
		</button>
	);
};

export default ArrowToTop;
