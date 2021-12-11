<script lang="ts">
	import { weatherLocations } from '$lib/store';
	import type { RawWeatherData } from '$lib/types/weather';

	let selected = 0;

	const fetchWeatherData = () => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const lat = $weatherLocations[selected].cords.lat;
		const lon = $weatherLocations[selected].cords.lon;
		fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,pressure_msl,precipitation,weathercode,snow_height,freezinglevel_height,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,shortwave_radiation,direct_radiation,diffuse_radiation,evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum&timezone=${timeZone}&past_days=2`
		)
			.then((response) => response.json())
			.then((data: RawWeatherData) => {
				console.log(data);
			});
	};
</script>

<section class="mid-width">
	<p>hi</p>
</section>

<style lang="scss">
</style>
