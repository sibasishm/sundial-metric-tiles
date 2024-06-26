import ky from 'ky';
import type { TKPI, TMetric, TSanpshot, TSegment } from './models';

export const getMetrics = async () => {
	const body = await ky.get('/api/metrics').json<{ data: Array<TMetric> }>();
	return body;
};

export const getSegments = async () => {
	const body = await ky.get('/api/segments').json<{ data: Array<TSegment> }>();
	return body;
};

export const getSnapshots = async (payload: TKPI) => {
	const body = await ky
		.post('/api/snapshot', {
			json: payload,
		})
		.json<{ data: TSanpshot }>();
	return body;
};
