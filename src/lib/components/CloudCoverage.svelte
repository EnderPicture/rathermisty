<script lang="ts">
	export let percent: number;
	export let unit: string;
	export let windSpeeds: number[] = undefined;
	export let className = '';
</script>

<div class={`cloud ${className}`}>
	{#if windSpeeds === undefined}
		<div class="clouds-bg abs" style={`--percent: ${percent}%`} />
	{:else}
		<div class="cloud-bg-list abs">
			{#each windSpeeds as windSpeed}
				<div
					class="clouds-bg animated"
					style={`--percent: ${percent}%; --speed: ${(1 / windSpeed) * 150}s`}
				/>
			{/each}
		</div>
	{/if}
	<div />
	<p>
		{percent}<sub>{unit}</sub>
	</p>
</div>

<style lang="scss">
	.cloud {
		position: relative;
	}
	.abs {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		opacity: 0.2;
		filter: blur(5px);
	}
	.cloud-bg-list {
		display: grid;
		overflow: hidden;
	}
	.clouds-bg {
		background-repeat: repeat;
		background-size: calc(100% / 3) 100%;
		background-image: linear-gradient(
			to right,
			#fff0 calc(50% - var(--percent) / 2),
			white calc(50% - var(--percent) / 2),
			white calc(50% + var(--percent) / 2),
			#fff0 calc(50% + var(--percent) / 2)
		);
	}
	.animated {
		background-size: calc(100% / 6) 100%;
		width: 200%;
		animation-name: scroll;
		animation-timing-function: linear;
		animation-duration: 5s;
		animation-iteration-count: infinite;
		animation-duration: var(--speed);
	}
	p {
		margin: 0.25rem;
		font-size: 1.2rem;
		font-weight: 800;
		opacity: 0.9;
		text-align: center;
	}
	sub {
		font-size: 0.6em;
		vertical-align: baseline;
		opacity: 0.5;
	}
	@keyframes scroll {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0%);
		}
	}
</style>
