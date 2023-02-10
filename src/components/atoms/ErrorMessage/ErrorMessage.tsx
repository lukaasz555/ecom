type ErrorMessageProps = {
	text1: string;
	text2?: string;
};

const ErrorMessage = ({ text1, text2 }: ErrorMessageProps) => {
	return (
		<div className='w-[100%] min-h-[200px] flex justify-center items-center'>
			<p className='text-brownSugar text-center'>
				{text1}
				<br />
				{text2}
				<div className='flex justify-center mt-0.5'>
					<svg
						width='22'
						height='26'
						viewBox='0 0 22 26'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<circle cx='11' cy='11' r='10.5' stroke='#B96D40' />
						<path
							d='M11.576 5.36364L11.5021 13.6648H10.5021L10.4283 5.36364H11.576ZM11.0021 17.0852C10.7786 17.0852 10.5855 17.0057 10.4226 16.8466C10.2635 16.6837 10.1839 16.4905 10.1839 16.267C10.1839 16.0398 10.2635 15.8466 10.4226 15.6875C10.5855 15.5284 10.7786 15.4489 11.0021 15.4489C11.2256 15.4489 11.4169 15.5284 11.576 15.6875C11.7389 15.8466 11.8203 16.0398 11.8203 16.267C11.8203 16.4148 11.7824 16.5511 11.7067 16.6761C11.6347 16.8011 11.5362 16.9015 11.4112 16.9773C11.29 17.0492 11.1536 17.0852 11.0021 17.0852Z'
							fill='#B96D40'
						/>
					</svg>
				</div>
			</p>
		</div>
	);
};

export default ErrorMessage;
