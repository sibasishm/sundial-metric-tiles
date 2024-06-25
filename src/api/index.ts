import ky from 'ky';
import type { TMetric, TSanpshot, TSegment } from './models';

export const getMetrics = async () => {
	const body = await ky.get('/api/metrics').json<{ data: Array<TMetric> }>();
	return body;
};

export const getSegments = async () => {
	const body = await ky.get('/api/segments').json<{ data: Array<TSegment> }>();
	return body;
};

export const getSnapshots = async (payload: {
	metric: string;
	segmentKey: string;
	date: string;
}) => {
	const body = await ky
		.post('/api/snapshots', {
			json: payload,
		})
		.json<{ data: Array<TSanpshot> }>();
	return body;
};
