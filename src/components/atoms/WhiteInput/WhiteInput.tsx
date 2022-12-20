import React from 'react';

interface IWhiteInput {
	value: string | number;
	type: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	maxLength?: number;
	max?: number;
}

const WhiteInput = ({
	type,
	placeholder,
	onChange,
	value,
	name,
	maxLength,
	max,
}: IWhiteInput) => {
	return (
		<input
			type={type}
			className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			name={name}
			maxLength={maxLength}
			max={max}
		/>
	);
};

export default WhiteInput;
