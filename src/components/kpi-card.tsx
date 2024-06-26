import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './select-dropdown';
import { Button } from './button';

function KpiCard() {
	const [mode, setMode] = useState<'EDIT' | 'VIEW'>('VIEW');

	if (mode === 'EDIT') {
		return (
			<div onClick={() => setMode('VIEW')} className='flex flex-col gap-4'>
				<Select>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select a fruit' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value='apple'>Apple</SelectItem>
							<SelectItem value='banana'>Banana</SelectItem>
							<SelectItem value='blueberry'>Blueberry</SelectItem>
							<SelectItem value='grapes'>Grapes</SelectItem>
							<SelectItem value='pineapple'>Pineapple</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<div className='flex items-center gap-2'>
					<Button variant='destructive'>Cancel</Button>
					<Button>Add</Button>
				</div>
			</div>
		);
	}

	return (
		<div onClick={() => setMode('EDIT')}>
			<h3 className='text-lg md:text-xl font-bold text-gray-800'>
				Daily Active Users, India
			</h3>
			<div className='flex justify-between items-center'>
				<div>
					<p className='text-2xl font-bold text-gray-800'>52.5K</p>
					<div className='flex items-center'>
						<div className='flex items-center'>
							<span className='text-sm text-gray-500'>Arrow Icon</span>
							<div className='ml-2 text-sm text-gray-500'>Active Users</div>
						</div>
						<div className='flex items-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 ml-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 5l7 7-7 7'
								/>
								<div className='ml-2 text-sm text-gray-500'>7d</div>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default KpiCard;
