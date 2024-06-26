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
	return (
		<main className='container mx-auto max-w-7xl px-4 py-10'>
			<div className='bg-white p-8 rounded-lg shadow-md grid-container'>
				{indicators.length > 0 ? (
					indicators.map((indicator, index) => (
						<div key={index} className='flex flex-row gap-6 justify-between'>
							<div className='flex-1'>
								<KPICard
									onClick={() => {
										setIndicators(prev => {
											const newIndicators = [...prev];
											newIndicators[index].mode = 'EDIT';
											return newIndicators;
										});
									}}
									indicator={indicator}
									onSave={indicators =>
										setIndicators(prev => {
											const newIndicators = [...prev];
											newIndicators[index] = indicators;
											return newIndicators;
										})
									}
									onCancel={() => {
										setIndicators(prev => {
											const newIndicators = [...prev];
											newIndicators.splice(index, 1);
											return newIndicators;
										});
									}}
								/>
							</div>
							<div className='h-full w-[2px] bg-gray-200 relative'>
								<Button
									size='icon'
									className='h-6 w-6 rounded-full absolute top-1/2 -translate-x-1/2'
									onClick={() => {
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
									}}
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
						<Button
							className='mt-6'
							onClick={() =>
								setIndicators([
									{
										id: 0,
										mode: 'EDIT',
										metric: '',
										segmentKey: '',
										segmentId: '',
									},
								])
							}
						>
							Add KPI
						</Button>
					</div>
				)}
			</div>
		</main>
	);
}

export default App;
