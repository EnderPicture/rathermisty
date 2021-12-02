import type { Properties } from '$lib/types/photon-api';

export interface WeatherLocation {
	cords: LatLon;
	name: string;
	properties: Properties;
}

export interface LatLon {
	lat: number;
	lon: number;
}
