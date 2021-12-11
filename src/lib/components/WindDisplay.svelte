<script lang="ts">
	export let windSpeed: number;
	export let windSpeedUnit: string;
	export let windDirection: number;
	export let windDirectionUnit: string;
</script>

<template>
	<div class="wind">
		<div class="wind-direction">
			<div class="arrow">
				<img src="/direction.svg" alt="" style={`transform: rotate(${windDirection}deg)`} />
			</div>
		</div>
		<p class="wind-speed">
			{windSpeed.toFixed(1)}<sub class="unit">{windSpeedUnit}</sub>
		</p>
	</div>
</template>

<style lang="scss">
	p {
		margin: 0;
	}
	.wind-speed {
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
	.wind {
		display: flex;
		align-items: flex-end;

		* + * {
			margin-left: 0.5rem;
		}
	}
	.wind-direction {
		position: relative;

		img {
			width: 0.5rem;
			height: 1rem;
		}

		sup {
			font-size: 0.6em;
			vertical-align: super;
			opacity: 0.5;
		}
	}
</style>
