import React from 'react';
import clsx from 'clsx';

interface ITextarea {
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	name: string;
	label: string;
	value: string;
	disabled?: boolean;
}

const Textarea = ({
	onChange,
	name,
	label,
	value,
	disabled = false,
}: ITextarea) => {
	return (
		<div className='flex flex-col mb-5'>
			<label className={clsx('mb-1 font-light', disabled ? 'text-pencil' : '')}>
				{label}
			</label>
			<textarea
				className={clsx(
					'border-[1px] border-pencil bg-lightGray outline-black min-h-[160px] p-3 font-[300]',
					'disabled:cursor-not-allowed disabled:border-lightGray disabled:bg-transparent'
				)}
				onChange={onChange}
				name={`${name}`}
				value={value}
				disabled={disabled}
			/>
		</div>
	);
};

export default Textarea;
