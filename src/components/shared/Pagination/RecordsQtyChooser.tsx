import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

type QtyChooserProps = {
	limit: number;
	handleLimitChange: (e: React.MouseEvent) => void;
	options?: number[];
};

const RecordsQtyChooser = ({
	limit,
	handleLimitChange,
	options = [10, 15, 25, 40],
}: QtyChooserProps) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const listRef = useRef<HTMLUListElement>(null);

	const handleChange = (e: React.MouseEvent) => {
		handleLimitChange(e);
		setOpen(false);
	};

	useEffect(() => {
		// currently no idea how to replace any to make it works:|
		const handler = (e: any) => {
			const target = e.target as Element;
			if (!listRef.current) {
				return;
			}
			if (!listRef.current.contains(target)) {
				setOpen(false);
			}
		};
		document.addEventListener('click', handler, { capture: true });
		return () => document.removeEventListener('click', handler);
	}, []);

	return (
		<div className='relative ml-auto md:ml-10'>
			<button
				onClick={() => setOpen(!isOpen)}
				className='text-l border-black mb-1 py-0 border-b-2'>
				{limit}
			</button>
			{isOpen && (
				<ul
					ref={listRef}
					className={clsx(
						'border-[1px] border-brownSugar w-[60px] bg-white',
						'absolute left-1/2 bottom-[100%] -translate-x-1/2'
					)}>
					{options.map((item, index) => (
						<li
							key={item + index}
							className={clsx(
								'flex flex-col items-center my-1 first:mt-0 last:mb-0 py-2',
								'hover:bg-black hover:text-white',
								item === limit ? 'text-brownSugar ' : 'text-black'
							)}>
							<button
								onClick={(e: React.MouseEvent) => handleChange(e)}
								className='w-[100%]'>
								{item}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default RecordsQtyChooser;
