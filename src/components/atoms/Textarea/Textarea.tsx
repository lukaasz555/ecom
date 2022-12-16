import React from 'react';

interface ITextarea {
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	name: string;
	label: string;
}

const Textarea = ({ onChange, name, label }: ITextarea) => {
	return (
		<div className='flex flex-col mb-5'>
			<label className='mb-1 font-light'>{label}</label>
			<textarea
				className='border-[1px] border-pencil bg-lightGray outline-black min-h-[160px] p-3 font-[400]'
				onChange={onChange}
				name={`${name}`}
			/>
		</div>
	);
};

export default Textarea;
