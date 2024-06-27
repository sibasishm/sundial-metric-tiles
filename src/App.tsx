import { useState } from 'react';
import { CirclePlus } from 'lucide-react';

import { TKPI } from './api/models';
import { KPICard } from './components/kpi-card';
import { Button } from './components/button';

export type TIndicator = TKPI & {
	id: number;
	mode: 'VIEW' | 'EDIT';
};

function App() {
	const [indicators, setIndicators] = useState<TIndicator[]>([]);

	const handleAddIndicator = (index: number) => {
		setIndicators(prev => {
			const newIndicators = [...prev];
			newIndicators.splice(index + 1, 0, {
				id: newIndicators.length,
				mode: 'EDIT',
				metric: '',
				segmentKey: '',
				segmentId: '',
			});
			return newIndicators;
		});
	};

	const handleSaveIndicator = (index: number, indicator: TIndicator) => {
		setIndicators(prev => {
			const newIndicators = [...prev];
			newIndicators[index] = indicator;
			return newIndicators;
		});
	};

	const handleCancelIndicator = (index: number) => {
		setIndicators(prev => {
			const newIndicators = [...prev];
			newIndicators.splice(index, 1);
			return newIndicators;
		});
	};

	const handleEditIndicator = (index: number) => {
		setIndicators(prev => {
			const newIndicators = [...prev];
			newIndicators[index].mode = 'EDIT';
			return newIndicators;
		});
	};

	const handleAddNewIndicator = () => {
		setIndicators([
			{
				id: 0,
				mode: 'EDIT',
				metric: '',
				segmentKey: '',
				segmentId: '',
			},
		]);
	};

	return (
		<main className='container mx-auto max-w-7xl px-4 py-10'>
			<div className='bg-white p-8 rounded-lg shadow-md grid-container'>
				{indicators.length > 0 ? (
					indicators.map((indicator, index) => (
						<div key={index} className='flex flex-row gap-6 justify-between'>
							<div className='flex-1'>
								<KPICard
									indicator={indicator}
									onClick={() => handleEditIndicator(index)}
									onSave={indicator => handleSaveIndicator(index, indicator)}
									onCancel={() => handleCancelIndicator(index)}
								/>
							</div>
							<div className='h-full w-[2px] bg-gray-200 relative'>
								<Button
									size='icon'
									className='h-6 w-6 rounded-full absolute top-1/2 -translate-x-1/2'
									onClick={() => handleAddIndicator(index)}
								>
									<CirclePlus fill='#119F97' />
								</Button>
							</div>
						</div>
					))
				) : (
					<div className='flex flex-col items-center justify-center'>
						<h1 className='text-2xl font-bold'>No KPIs yet</h1>
						<p className='text-gray-500'>Add some KPIs to get started</p>
						<Button className='mt-6' onClick={handleAddNewIndicator}>
							Add KPI
						</Button>
					</div>
				)}
			</div>
		</main>
	);
}

export default App;
