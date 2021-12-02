import { writable } from 'svelte/store';
import type { WeatherLocation } from '$lib/types/types';

export const weatherLocations = writable<WeatherLocation[]>([]);
