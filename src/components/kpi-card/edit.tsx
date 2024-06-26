import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMetrics, getSegments } from '../../api';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../select-dropdown';
import { Button } from '../button';
import { TKPI } from '../../api/models';

export const EditKPICard = ({
	onSave,
	onCancel,
}: {
	onSave: (indicators: TKPI) => void;
	onCancel: () => void;
}) => {
	const [metric, setMetric] = useState('');
	const [segmentId, setSegmentId] = useState('');
	const [segmentKey, setSegmentKey] = useState('');

	const { data: metrics } = useQuery({
		queryKey: ['metrics'],
		queryFn: getMetrics,
	});
	const { data: segments } = useQuery({
		queryKey: ['segments'],
		queryFn: getSegments,
	});

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
					<Button variant='destructive' className='w-full' onClick={onCancel}>
						Cancel
					</Button>
				</div>
				<div className='flex-1'>
					<Button
						className='w-full'
						onClick={() => {
							onSave({
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
