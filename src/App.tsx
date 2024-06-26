import { useState } from 'react';
import { TKPI } from './api/models';
import { EditKPICard, ViewKPICard } from './components/kpi-card';

function App() {
	const [indicators, setIndicators] = useState<TKPI[]>([]);
	return (
		<main className='container mx-auto max-w-7xl px-4 py-10'>
			<div className='bg-white p-8 rounded-lg shadow-md'>
				{indicators.map((indicator, index) => (
					<ViewKPICard key={index} indicator={indicator} />
				))}
				<EditKPICard
					onSave={indicators => setIndicators(prev => prev.concat(indicators))}
				/>
			</div>
		</main>
	);
}

export default App;
