import { useQuery } from '@tanstack/react-query';
import { getMetrics } from './api';
import KpiCard from './components/kpi-card';

function App() {
	const { data } = useQuery({
		queryKey: ['metrics'],
		queryFn: getMetrics,
		refetchOnWindowFocus: false,
	});

	console.log(data);

	return (
		<main className='container mx-auto max-w-7xl px-4 py-10'>
			<div className='bg-white p-8 rounded-lg shadow-md'>
				<KpiCard />
			</div>
		</main>
	);
}

export default App;
