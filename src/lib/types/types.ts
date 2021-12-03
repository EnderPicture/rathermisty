import type { Feature } from '$lib/types/photon-api';

export interface WeatherLocation {
	cords: LatLon;
	name: string;
	feature: Feature;
}

export interface LatLon {
	lat: number;
	lon: number;
}
