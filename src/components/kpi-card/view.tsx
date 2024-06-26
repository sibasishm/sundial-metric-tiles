import { useQuery } from '@tanstack/react-query';
import { ArrowUp, ArrowDown, Triangle } from 'lucide-react';

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
			<h3 className='text-lg md:text-xl font-bold text-gray-800'>
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
			<div className='flex justify-between items-center'>
				<div>
					<p className='text-2xl font-bold text-gray-800'>
						{formatNumber(
							getAverage(snapshots.data.values.map(val => val.value))
						)}
					</p>
					<div className='flex items-center gap-6'>
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
			</div>
		</div>
	);
};
