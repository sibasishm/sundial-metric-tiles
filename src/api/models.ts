export type TMetric = {
	id: string;
	displayName: string;
	isPercentageMetric: boolean;
};

export type TSegment = {
	segmentKey: string;
	displayName: string;
	values: Array<{ segmentId: string; displayName: string }>;
};

export type TSanpshot = {
	metric: string;
	segmentKey: string;
	segmentId: string;
	values: Array<{
		date: string;
		value: number;
	}>;
};
