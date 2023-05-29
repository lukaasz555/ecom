import React from 'react';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';

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
}: IWhiteInput) => {
	return (
		<>
			<input
				type={type}
				className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				name={name}
				maxLength={maxLength}
				minLength={minLength}
				required={required}
			/>
			{error ? <InputErrorMessage text={error} /> : null}
		</>
	);
};

export default WhiteInput;
