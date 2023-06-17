import React from 'react';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';
import clsx from 'clsx';

interface IWhiteInput {
	value: string | number | undefined;
	type: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	maxLength?: number;
	minLength?: number;
	required?: boolean;
	error?: string;
	disabled?: boolean;
}

const WhiteInput = ({
	type,
	placeholder,
	onChange,
	value,
	name,
	maxLength,
	minLength,
	required,
	error,
	disabled,
}: IWhiteInput) => {
	return (
		<div className='flex flex-col'>
			<input
				type={type}
				className={clsx(
					'border-[1px] p-2 font-[300] bg-white outline-black text-m w-full',
					error ? 'border-error' : 'border-[#C7C7C7]',
					disabled
						? 'cursor-not-allowed border-lightGray bg-transparent'
						: 'cursor-text'
				)}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				name={name}
				maxLength={maxLength}
				minLength={minLength}
				required={required}
			/>
			{error ? <InputErrorMessage text={error} /> : null}
		</div>
	);
};

export default WhiteInput;
