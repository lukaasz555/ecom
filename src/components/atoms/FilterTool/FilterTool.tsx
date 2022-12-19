import React from 'react';
import { useElementSize } from 'usehooks-ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface FilterToolProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onClick: (id: string) => void;
}

const FilterTool = ({ open, setOpen, onClick }: FilterToolProps) => {
	const [divRef, { width }] = useElementSize();
	return (
		<div className={`w-${width} mx-10 border-b-[1px] mb-10  flex justify-end`}>
			<div className={`${open ? 'bg-sparkle' : 'bg-white'} relative`}>
				<button
					className={`flex items-center bg-white justify-end uppercase py-2 px-5 text-s
						w-[300px]
					`}
					onClick={() => setOpen(!open)}>
					sortuj
					<FontAwesomeIcon icon={faChevronDown} className='text-xs ml-1' />
				</button>
				<ul
					className={`absolute top-[102%] right-0 bg-lightGray z-30 pl-5 duration-150 ${
						open ? 'scale-y-100' : 'scale-y-0'
					} origin-top flex flex-col items-end w-[300px]`}>
					<li>
						<button
							id='declining'
							className='uppercase text-l font-light px-5 py-3 font-[200] border-b-[1px] w-[300px] text-right'
							onClick={(e) => {
								const targ = e.target as Element;
								if (targ != null) {
									onClick(targ.id);
								}
								setOpen(!open);
							}}>
							Od najdroŻszych
						</button>
					</li>
					<li>
						<button
							id='growing'
							className='uppercase text-l font-light px-5 py-3 font-[200] border-b-[1px] w-[300px] text-right'
							onClick={(e) => {
								const targ = e.target as Element;
								if (targ != null) {
									onClick(targ.id);
								}
								setOpen(!open);
							}}>
							od najtańszych
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default FilterTool;
