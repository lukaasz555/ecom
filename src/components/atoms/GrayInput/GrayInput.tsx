import React from 'react';

interface InputProps {
	type: string;
	label?: string;
	name: string;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	placeholder?: string;
	disabled?: boolean;
}

const GrayInput = ({
	type,
	label,
	name,
	onChange,
	value,
	placeholder,
	disabled = false,
}: InputProps) => {
	return (
		<div className='flex flex-col mb-5'>
			{label ? <label className='mb-1 font-light'>{label}</label> : null}
			<input
				type={`${type}`}
				className='border-[1px] p-3 font-[300] border-pencil bg-lightGray outline-black text-m'
				name={`${name}`}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
			/>
		</div>
	);
};

export default GrayInput;
