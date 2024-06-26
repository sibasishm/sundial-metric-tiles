import { useState } from 'react';
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
			<div className='bg-white p-8 rounded-lg shadow-md grid grid-flow-col auto-cols-fr gap-4'>
				{indicators.length > 0 ? (
					indicators.map((indicator, index) => (
						<KPICard
							onClick={() => {
								setIndicators(prev => {
									const newIndicators = [...prev];
									newIndicators[index].mode = 'EDIT';
									return newIndicators;
								});
							}}
							key={index}
							indicator={indicator}
							onSave={indicators =>
								setIndicators(prev => {
									const newIndicators = [...prev];
									newIndicators[index] = indicators;
									console.log(newIndicators);
									return newIndicators;
								})
							}
						/>
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
