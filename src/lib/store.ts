import { writable } from 'svelte/store';
import type { WeatherLocation } from '$lib/types/types';
import { browser } from '$app/env';

export const weatherLocations = writable<WeatherLocation[]>([]);
export const selectedLocation = writable<number>(-1);

if (browser) {
	let weatherLocationsValue: WeatherLocation[];
	let selectedLocationValue: number;
	const checkValidSelectedLocation = () => {
		if (
			selectedLocationValue !== -1 &&
			!weatherLocationsValue.find((d) => d.id === selectedLocationValue)
		) {
			console.log('hi');
			selectedLocation.set(-1);
		}
	};

	weatherLocations.set(
		JSON.parse(localStorage.getItem('weatherLocations') ?? '[]') as WeatherLocation[]
	);
	weatherLocations.subscribe((value) => {
		weatherLocationsValue = value;
		checkValidSelectedLocation();
		localStorage.setItem('weatherLocations', JSON.stringify(value));
	});

	selectedLocation.set(Number.parseInt(localStorage.getItem('selectedLocation') ?? '-1'));
	selectedLocation.subscribe((value) => {
		selectedLocationValue = value;
		checkValidSelectedLocation();
		localStorage.setItem('selectedLocation', value.toString());
	});
}
