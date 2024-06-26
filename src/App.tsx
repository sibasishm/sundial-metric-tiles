import { useState } from 'react';
import { TKPI } from './api/models';
import { EditKPICard, ViewKPICard } from './components/kpi-card';
import { Button } from './components/button';

function App() {
	const [isEditing, setIsEditing] = useState(false);
	const [indicators, setIndicators] = useState<TKPI[]>([]);
	return (
		<main className='container mx-auto max-w-7xl px-4 py-10'>
			<div className='bg-white p-8 rounded-lg shadow-md grid grid-flow-col auto-cols-fr gap-4'>
				{indicators.length > 0 ? (
					indicators.map((indicator, index) => (
						<ViewKPICard key={index} indicator={indicator} />
					))
				) : isEditing ? (
					<EditKPICard
						onSave={indicators =>
							setIndicators(prev => prev.concat(indicators))
						}
						onCancel={() => setIsEditing(false)}
					/>
				) : (
					<div className='flex flex-col items-center justify-center'>
						<h1 className='text-2xl font-bold'>No KPIs yet</h1>
						<p className='text-gray-500'>Add some KPIs to get started</p>
						<Button className='mt-6' onClick={() => setIsEditing(true)}>
							Add KPI
						</Button>
					</div>
				)}
			</div>
		</main>
	);
}

export default App;
