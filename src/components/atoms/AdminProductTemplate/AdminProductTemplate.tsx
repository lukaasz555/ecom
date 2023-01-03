import React from 'react';

const AdminProductTemplate = () => {
	return (
		<div className='flex w-full border-b-[1px] text-s'>
			<div className='basis-[15%]'>ID</div>
			<div className='basis-[40%]'>TYTUŁ</div>
			<div className='basis-[15%] text-center'>CENA</div>
			<div className='basis-[15%] text-center'>RODZAJ</div>
			<div className='basis-[15%] text-center '>AKCJE</div>
		</div>
	);
};

export default AdminProductTemplate;
