import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowUp, ArrowDown, Triangle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './select-dropdown';
import { Button } from './button';
import { getMetrics, getSegments, getSnapshots } from '../api';
import { formatNumber, getAverage, getPercentageChange } from '../utils';
import { TIndicator } from '../App';

export const KPICard = ({
	indicator,
	onSave,
	onClick,
}: {
	indicator: TIndicator;
	onSave?: (indicators: TIndicator) => void;
	onClick: () => void;
}) => {
	const [metric, setMetric] = useState(indicator.metric);
	const [segmentId, setSegmentId] = useState(indicator.segmentId);
	const [segmentKey, setSegmentKey] = useState(indicator.segmentKey);

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
		queryFn: () => (indicator ? getSnapshots(indicator) : null),
	});

	if (indicator.mode === 'VIEW') {
		if (isLoading || !snapshots) {
			return <div>Loading...</div>;
		}

		const percentageChange = getPercentageChange(
			snapshots.data.values[0].value,
			snapshots.data.values[snapshots.data.values.length - 1].value
		);

		return (
			<div onClick={onClick}>
				<h3 className='text-lg text-gray-700'>
					{
						metrics?.data.find(metric => metric.id === indicator.metric)
							?.displayName
					}
					,{' '}
					{
						segments?.data
							.find(segment => segment.segmentKey === indicator.segmentKey)
							?.values.find(
								segment => segment.segmentId === indicator.segmentId
							)?.displayName
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
	}

	return (
		<div className='flex flex-col gap-4 max-w-[224px] mx-auto w-full'>
			<Select value={metric} onValueChange={setMetric}>
				<SelectTrigger>
					<SelectValue placeholder='Select a metric' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{metrics?.data.map(metric => (
							<SelectItem key={metric.id} value={metric.id}>
								{metric.displayName}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select value={segmentKey} onValueChange={setSegmentKey}>
				<SelectTrigger>
					<SelectValue placeholder='Select a segment' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{segments?.data.map(segment => (
							<SelectItem key={segment.segmentKey} value={segment.segmentKey}>
								{segment.displayName}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			{segmentKey ? (
				<Select value={segmentId} onValueChange={setSegmentId}>
					<SelectTrigger>
						<SelectValue placeholder='Select a segment' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{segments?.data
								.find(segment => segment.segmentKey === segmentKey)
								?.values.map(segment => (
									<SelectItem key={segment.segmentId} value={segment.segmentId}>
										{segment.displayName}
									</SelectItem>
								))}
						</SelectGroup>
					</SelectContent>
				</Select>
			) : null}
			<div className='flex items-center gap-2'>
				<div className='flex-1'>
					<Button
						variant='destructive'
						className='w-full'
						onClick={() => {
							onSave?.({
								...indicator,
								mode: 'VIEW',
							});
						}}
					>
						Cancel
					</Button>
				</div>
				<div className='flex-1'>
					<Button
						className='w-full'
						onClick={() => {
							onSave?.({
								id: indicator.id,
								mode: 'VIEW',
								metric,
								segmentKey,
								segmentId,
							});
						}}
					>
						Add
					</Button>
				</div>
			</div>
		</div>
	);
};
