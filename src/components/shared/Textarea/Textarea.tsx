import React from 'react';
import clsx from 'clsx';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';

interface ITextarea {
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	name: string;
	label: string;
	value: string;
	disabled?: boolean;
	error?: string;
}

const Textarea = ({
	onChange,
	name,
	label,
	value,
	disabled = false,
	error,
}: ITextarea) => {
	return (
		<div className='flex flex-col mb-5'>
			<label className={clsx('mb-1 font-light', disabled ? 'text-pencil' : '')}>
				{label}
			</label>
			<textarea
				className={clsx(
					'border-[1px] border-pencil bg-lightGray outline-black min-h-[160px] p-3 font-[300]',
					'disabled:cursor-not-allowed disabled:border-lightGray disabled:bg-transparent',
					error ? 'border-error' : ''
				)}
				onChange={onChange}
				name={`${name}`}
				value={value}
				disabled={disabled}
			/>
			{error ? <InputErrorMessage text={error} /> : null}
		</div>
	);
};

export default Textarea;
