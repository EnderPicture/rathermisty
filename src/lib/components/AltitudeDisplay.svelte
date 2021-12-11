<script lang="ts">
	import type { WeatherHour } from '$lib/types/weather';
	import CloudCoverage from './CloudCoverage.svelte';
	import WindDisplay from './WindDisplay.svelte';

	export let thisHour: WeatherHour;
</script>

<section class="mid-width atmosphere">
	<p class="column-name">altitude</p>
	<p class="column-name">wind</p>
	<p class="column-name">cloud cover</p>
	<p class="altitude" />
	<div />
	<CloudCoverage percent={thisHour.values.cloudcover_high} unit={thisHour.units.cloudcover_high} />
	<p class="altitude">8000<sub class="unit">m</sub></p>
	<p class="col-span-2 altitude-line" />
	<p class="altitude" />
	<div />
	<CloudCoverage percent={thisHour.values.cloudcover_mid} unit={thisHour.units.cloudcover_mid} />
	<p class="altitude">3000<sub class="unit">m</sub></p>
	<p class="col-span-2 altitude-line" />
	<p class="altitude">180<sub class="unit">m</sub></p>
	<WindDisplay
		windSpeed={thisHour.values.windspeed_180m}
		windSpeedUnit={thisHour.units.windspeed_180m}
		windDirection={thisHour.values.winddirection_180m}
		windDirectionUnit={thisHour.units.winddirection_180m}
	/>
	<CloudCoverage
		className="row-span-4"
		percent={thisHour.values.cloudcover_low}
		unit={thisHour.units.cloudcover_low}
		windSpeeds={[
			thisHour.values.windspeed_180m,
			thisHour.values.windspeed_120m,
			thisHour.values.windspeed_80m,
			thisHour.values.windspeed_10m
		]}
	/>
	<p class="altitude">120<sub class="unit">m</sub></p>
	<WindDisplay
		windSpeed={thisHour.values.windspeed_120m}
		windSpeedUnit={thisHour.units.windspeed_120m}
		windDirection={thisHour.values.winddirection_120m}
		windDirectionUnit={thisHour.units.winddirection_120m}
	/>
	<p class="altitude">80<sub class="unit">m</sub></p>
	<WindDisplay
		windSpeed={thisHour.values.windspeed_80m}
		windSpeedUnit={thisHour.units.windspeed_80m}
		windDirection={thisHour.values.winddirection_80m}
		windDirectionUnit={thisHour.units.winddirection_80m}
	/>
	<p class="altitude">10<sub class="unit">m</sub></p>
	<WindDisplay
		windSpeed={thisHour.values.windspeed_10m}
		windSpeedUnit={thisHour.units.windspeed_10m}
		windDirection={thisHour.values.winddirection_10m}
		windDirectionUnit={thisHour.units.winddirection_10m}
	/>
	<div />
	<p class="wind-speed">
		{thisHour.values.windgusts_10m}<sub class="unit">gusts</sub>
	</p>
	<div />
	<p class="altitude">0<sub class="unit">m</sub></p>
	<p class="col-span-2 altitude-line" />
</section>

<style lang="scss">
	.atmosphere {
		display: grid;
		grid-template-columns: min-content min-content 1fr;
		grid-auto-rows: auto;
		gap: 0.25rem 1rem;
		margin-top: 50px;

		.unit {
			font-size: 0.6em;
			vertical-align: baseline;
			opacity: 0.5;
		}

		p {
			margin: 0;
		}

		.wind-speed {
			white-space: nowrap;
			opacity: 0.9;
			font-weight: 800;
			font-size: 1.2rem;
			flex: 1;
			text-align: right;
			sub {
				font-size: 0.6em;
				vertical-align: baseline;
				opacity: 0.5;
			}
		}

		.col-span-2 {
			grid-column-end: span 2;
		}
		:global(.row-span-4) {
			grid-row-end: span 4;
		}

		.column-name {
			text-align: center;
			opacity: 0.5;
			margin-bottom: 1rem;
		}
		.altitude {
			text-align: right;
			opacity: 0.5;
			white-space: nowrap;
			font-size: 1.1rem;
		}
		.altitude-line {
			height: 2px;
			background-color: white;
			align-self: center;
			opacity: 0.3;
		}
	}
</style>
