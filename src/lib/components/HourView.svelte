<script lang="ts">
	import { weatherCodeMap } from '$lib/helper';

	import type { WeatherData, WeatherDay, WeatherHour } from '$lib/types/weather';

	export let weatherData: WeatherData;
	export let day: WeatherDay;
	export let hour: WeatherHour;

	$: apparentTempPercent = (() => {
		const delta = weatherData.apparentTempRange.max - weatherData.apparentTempRange.min;
		return ((hour.values.apparent_temperature - weatherData.apparentTempRange.min) / delta) * 100;
	})();

	$: tempPercent = (() => {
		const delta = weatherData.tempRange.max - weatherData.tempRange.min;
		return ((hour.values.temperature_2m - weatherData.tempRange.min) / delta) * 100;
	})();

	$: precipitationPrecent = (hour.values.precipitation / weatherData.maxPrecipitation) * 100;

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: 'numeric'
	};
</script>

<div class="hour">
	<p>{hour.date.toLocaleString('en-us', timeOptions).toLowerCase()}</p>
	<div />
	<p class="weather">
		{weatherCodeMap.get(hour.values.weathercode)}
	</p>
	<div class="cloud-graph">
		{#if hour.values.cloudcover_high > 0}
			<div class="cloud high" style={`--cloud-height: ${hour.values.cloudcover_high}%`} />
		{/if}
		{#if hour.values.cloudcover_mid > 0}
			<div class="cloud mid" style={`--cloud-height: ${hour.values.cloudcover_mid}%`} />
		{/if}
		{#if hour.values.cloudcover_low > 0}
			<div class="cloud low" style={`--cloud-height: ${hour.values.cloudcover_low}%`} />
		{/if}
	</div>
	<div class="graph">
		<p class="temperature" style={`bottom: ${apparentTempPercent}%`}>
			{hour.values.apparent_temperature.toFixed(1)}
		</p>
		<div class="precipitation" style={`height: ${precipitationPrecent}%`} />
		<img
			class="wind"
			src="/direction.svg"
			alt=""
			style={`
      transform: rotate(${hour.values.winddirection_10m}deg);
      bottom: ${hour.values.windgusts_10m}%;
    `}
		/>
	</div>
</div>

<style lang="scss">
	p {
		white-space: nowrap;
	}
	.hour {
		display: grid;
		grid-template-rows: 1fr auto auto;
	}
	p {
		writing-mode: vertical-rl;
		text-orientation: mixed;
		margin: 0;
		color: #ffffffcc;
	}
	.graph {
		height: 8rem;
		position: relative;
		margin-top: 0.5rem;
	}

	.temperature {
		writing-mode: vertical-rl;
		text-orientation: mixed;
		position: absolute;
		left: 0;
	}
	.precipitation {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 2px;
		background-color: #ffffff50;
	}
	.wind {
		position: absolute;
		height: 12px;
		width: 100%;
		opacity: 0.5;
		left: 0;
	}

	.cloud-graph {
		margin-top: 0.5rem;
		height: 5rem;
		grid-template-rows: repeat(3, 1fr);
		display: grid;
		align-items: flex-end;
		gap: 2px;
		filter: blur(5px);
		transform: scale(2, 1);
	}
	.cloud {
		width: 100%;
		background-color: #ffffff30;
		height: var(--cloud-height);
		&.high {
			grid-row-start: 1;
		}
		&.mid {
			grid-row-start: 2;
		}
		&.low {
			grid-row-start: 3;
		}
	}
</style>
