import { useQuery } from '@tanstack/react-query';
import { ArrowUp, ArrowDown, Triangle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

import { TKPI } from '../../api/models';
import { getMetrics, getSegments, getSnapshots } from '../../api';
import { formatNumber, getAverage, getPercentageChange } from '../../utils';

export const ViewKPICard = ({ indicator }: { indicator: TKPI }) => {
	const { data: metrics } = useQuery({
		queryKey: ['metrics'],
		queryFn: getMetrics,
	});
	const { data: segments } = useQuery({
		queryKey: ['segments'],
		queryFn: getSegments,
	});
	const { data: snapshots, isLoading } = useQuery({
		queryKey: ['snapshots', indicator],
		queryFn: () => getSnapshots(indicator),
	});

	if (isLoading || !snapshots) {
		return <div>Loading...</div>;
	}

	const percentageChange = getPercentageChange(
		snapshots.data.values[0].value,
		snapshots.data.values[snapshots.data.values.length - 1].value
	);

	return (
		<div>
			<h3 className='text-lg text-gray-700'>
				{
					metrics?.data.find(metric => metric.id === indicator.metric)
						?.displayName
				}
				,{' '}
				{
					segments?.data
						.find(segment => segment.segmentKey === indicator.segmentKey)
						?.values.find(segment => segment.segmentId === indicator.segmentId)
						?.displayName
				}
			</h3>
			<div className='flex justify-between items-end gap-8'>
				<div>
					<p className='text-2xl font-bold text-gray-800'>
						{formatNumber(
							getAverage(snapshots.data.values.map(val => val.value))
						)}
					</p>
					<div className='flex items-center gap-6 mt-2'>
						<div className='flex items-center'>
							<span className='text-sm text-gray-500'>
								{percentageChange > 0 ? (
									<ArrowUp className='h-4 w-4 text-green-700' />
								) : (
									<ArrowDown className='h-4 w-4 text-red-700' />
								)}
							</span>
							<div className='ml-1 text-sm text-gray-600'>
								{percentageChange.toFixed(2)}%
							</div>
						</div>
						<div className='flex items-center'>
							<Triangle className='h-4 w-4 text-gray-400' />
							<div className='ml-1 text-sm text-gray-600'>
								{snapshots.data.values.length}d
							</div>
						</div>
					</div>
				</div>
				<ResponsiveContainer width='100%' height={150}>
					<AreaChart data={snapshots.data.values}>
						<defs>
							<linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='0%' stopColor='#119F97' stopOpacity={0.4} />
								<stop offset='75%' stopColor='#119F97' stopOpacity={0.05} />
							</linearGradient>
						</defs>
						<Area dataKey='value' stroke='#119F97' fill='url(#color)' />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
