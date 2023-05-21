import React from 'react';
import clsx from 'clsx';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';

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
	error?: string;
}

const GrayInput = ({
	type,
	label,
	name,
	onChange,
	value,
	placeholder,
	disabled = false,
	error,
}: InputProps) => {
	return (
		<div className='flex flex-col mb-5'>
			{label ? (
				<label
					className={clsx('mb-1 font-light', disabled ? 'text-pencil' : '')}>
					{label}
				</label>
			) : null}
			<input
				type={`${type}`}
				className={clsx(
					'border-[1px] p-3 font-[300] border-pencil bg-lightGray outline-black text-m',
					'disabled:cursor-not-allowed disabled:border-lightGray disabled:bg-transparent',
					error ? 'border-error' : ''
				)}
				name={`${name}`}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
			/>
			{error ? <InputErrorMessage text={error} /> : null}
		</div>
	);
};

export default GrayInput;
