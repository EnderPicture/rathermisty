import { writable } from 'svelte/store';
import type { WeatherLocation } from '$lib/types/types';
import { browser } from '$app/env';


export const weatherLocations = writable<WeatherLocation[]>([]);

if (browser) {
	weatherLocations.set(
		JSON.parse(localStorage.getItem('weatherLocations') || '[]') as WeatherLocation[]
	);
	weatherLocations.subscribe((value) => {
		localStorage.setItem('weatherLocations', JSON.stringify(value));
	});
}