<script lang="ts">
	import AltitudeDisplay from '$lib/components/AltitudeDisplay.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import WeatherTimeLine from '$lib/components/WeatherTimeLine.svelte';
	import { crunchWeatherData } from '$lib/data-crunch';
	import { weatherCodeMap } from '$lib/helper';
	import { weatherLocations } from '$lib/store';
	import type { RawWeatherData, WeatherData } from '$lib/types/weather';
	import { selectedLocation } from '$lib/store';

	let rawWeatherData: RawWeatherData | null = null;

	const fetchWeatherData = (index: number) => {
		const location = $weatherLocations[index];
		const now = Date.now();
		// if (location.lastFetch + 60 * 60 * 1000 < now) {
		if (location.lastFetch + 1000 < now) {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const lat = location.cords.lat;
			const lon = location.cords.lon;
			fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,pressure_msl,precipitation,weathercode,snow_height,freezinglevel_height,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,shortwave_radiation,direct_radiation,diffuse_radiation,evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum&timezone=${timeZone}&past_days=2`
			)
				.then((response) => response.json())
				.then((data: RawWeatherData) => {
					rawWeatherData = data;
					weatherLocations.update((locs) => {
						locs[index].lastFetch = Date.now();
						locs[index].rawWeatherData = data;
						return locs;
					});
				})
				.catch((error) => {
					rawWeatherData = location.rawWeatherData;
				});
		} else if (location.rawWeatherData) {
			rawWeatherData = location.rawWeatherData;
		}
	};

	$: selectedLocationIndex =
		$selectedLocation === -1 ? 0 : $weatherLocations.findIndex((d) => d.id === $selectedLocation);
	$: console.log(selectedLocationIndex);
	$: location = $weatherLocations[selectedLocationIndex];
	$: if (location) fetchWeatherData(selectedLocationIndex);

	$: weatherData = rawWeatherData ? crunchWeatherData(rawWeatherData) : null;

	$: today = weatherData?.days.find((day) => day.tense === 'now');
	$: thisHour = today?.hours.find((hour) => hour.tense === 'now');
</script>

{#if thisHour}
	<section class="mid-width">
		<p class="intro-text">
			Currently, it's actually {thisHour.values.temperature_2m}{thisHour.units.temperature_2m} in {location.name}
		</p>
		<p class="intro-text">but feels like</p>
		<p class="temp">
			{thisHour.values.apparent_temperature}<sub class="unit"
				>{thisHour.units.apparent_temperature}</sub
			>
		</p>
		<p class="weather">
			{weatherCodeMap.get(thisHour.values.weathercode)}
		</p>
	</section>
	<AltitudeDisplay {thisHour} />
	<WeatherTimeLine {weatherData} days={weatherData.days} />
{/if}

<style lang="scss">
	.intro-text {
		margin-bottom: -0.5rem;
		color: #fffd;
	}
	.temp {
		font-size: 6rem;
		font-weight: 900;
		margin: 0;
		color: #fffe;
	}
	.weather {
		font-size: 2rem;
		color: #fffc;
		font-weight: 400;
		margin: 0;
	}
	.unit {
		font-size: 0.6em;
		vertical-align: baseline;
		color: #fffa;
	}
</style>
