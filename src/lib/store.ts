import { writable } from 'svelte/store';
import type { WeatherLocation } from '$lib/types/types';
import { browser } from '$app/env';

export const weatherLocations = writable<WeatherLocation[]>([]);
export const selectedLocation = writable<number>(-1);

if (browser) {
	weatherLocations.set(
		JSON.parse(localStorage.getItem('weatherLocations') ?? '[]') as WeatherLocation[]
	);
	weatherLocations.subscribe((value) => {
		localStorage.setItem('weatherLocations', JSON.stringify(value));
	});

	selectedLocation.set(Number.parseInt(localStorage.getItem('selectedLocation') ?? '-1'));
	selectedLocation.subscribe((value) => {
		localStorage.setItem('selectedLocation', value.toString());
	});
}
