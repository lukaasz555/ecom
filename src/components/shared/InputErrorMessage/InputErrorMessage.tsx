import React from 'react';

type InputErrorMessageProps = {
	text: string;
};

const InputErrorMessage = ({ text }: InputErrorMessageProps) => {
	return (
		<>
			{text.trim() === '' ? null : (
				<div className='mt-2'>
					<p className='text-error text-[13px]'>{text}</p>
				</div>
			)}
		</>
	);
};

export default InputErrorMessage;
