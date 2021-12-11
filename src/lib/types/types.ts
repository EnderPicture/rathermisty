import type { Feature } from '$lib/types/photon-api';
import type { RawWeatherData } from './weather';

export interface WeatherLocation {
	cords: LatLon;
	name: string;
	feature: Feature;
	rawWeatherData?: RawWeatherData;
	lastFetch: number;
	id: number;
}

export interface LatLon {
	lat: number;
	lon: number;
}
