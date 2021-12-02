export interface Geometry {
	coordinates: number[];
	type: string;
}

export interface Properties {
	osm_id: any;
	osm_type: string;
	country: string;
	osm_key: string;
	countrycode: string;
	osm_value: string;
	postcode: string;
	name: string;
	state: string;
	type: string;
	extent: number[];
	city: string;
	street: string;
	district: string;
	housenumber: string;
	locality: string;
}

export interface Feature {
	geometry: Geometry;
	type: string;
	properties: Properties;
}

export interface PhotonResult {
	features: Feature[];
	type: string;
}
