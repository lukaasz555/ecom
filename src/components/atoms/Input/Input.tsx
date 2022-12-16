import React from 'react';

interface InputProps {
	type: string;
	label: string;
	name: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const Input = ({ type, label, name, onChange }: InputProps) => {
	return (
		<div className='flex flex-col mb-5'>
			<label className='mb-1 font-light'>{label}</label>
			<input
				type={`${type}`}
				className='border-[1px] p-3 font-[400] border-pencil bg-lightGray outline-black text-[16px]'
				name={`${name}`}
				onChange={onChange}
			/>
		</div>
	);
};

export default Input;
