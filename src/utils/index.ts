import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getAverage(values: number[]) {
	return values.reduce((a, b) => a + b, 0) / values.length;
}

export function getPercentageChange(value: number, previousValue: number) {
	return ((value - previousValue) / previousValue) * 100;
}

export const formatNumber = (value: number) =>
	Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);
