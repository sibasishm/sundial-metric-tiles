import ky from 'ky';
import type { TMetric, TSanpshot, TSegment } from './models';

const api = ky.extend({
	prefixUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
	headers: {
		'Content-Type': 'application/json',
		// 'Access-Control-Allow-Origin': '*',
	},
});

export const getMetrics = async () => {
	const body = await api.get('metrics').json<{ data: Array<TMetric> }>();
	return body;
};

export const getSegments = async () => {
	const body = await api.get('segments').json<{ data: Array<TSegment> }>();
	return body;
};

export const getSnapshots = async (payload: {
	metric: string;
	segmentKey: string;
	date: string;
}) => {
	const body = await api
		.post('snapshots', {
			json: payload,
		})
		.json<{ data: Array<TSanpshot> }>();
	return body;
};
