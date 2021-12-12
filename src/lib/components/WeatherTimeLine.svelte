<script lang="ts">
	import type { WeatherData, WeatherDay } from '$lib/types/weather';
	import HourView from './HourView.svelte';

	export let weatherData: WeatherData;
	export let days: WeatherDay[];

	let showPast = false;
	let showFuture = false;

	$: past = days.filter((day) => day.tense === 'past');
	$: now = days.filter((day) => day.tense === 'now');
	$: future = days.filter((day) => day.tense === 'future');

	const dayOptions: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		month: 'short',
		day: 'numeric'
	};
</script>

<div class="timeline">
	<div class="track">
		<div>
			<button class="day-marker" on:click={() => (showPast = !showPast)}>
				<p>
					{showPast ? 'Hide' : 'View'} past history
				</p>
			</button>
		</div>
		{#if showPast}
			{#each past as day, index}
				<article class="day">
					<div class="day-marker">
						{day.date.toLocaleString('en-us', dayOptions)}
					</div>
					{#each day.hours as hour}
						<HourView {day} {hour} {weatherData} />
					{/each}
				</article>
			{/each}
		{/if}
		{#each [...now, future[0]] as day, index}
			<article class="day">
				<div class="day-marker">
					{day.date.toLocaleString('en-us', dayOptions)}
				</div>
				{#each day.hours as hour}
					<HourView {day} {hour} {weatherData} />
				{/each}
			</article>
		{/each}
		{#if showFuture}
			{#each future.slice(1) as day, index}
				<article class="day">
					<div class="day-marker">
						{day.date.toLocaleString('en-us', dayOptions)}
					</div>
					{#each day.hours as hour}
						<HourView {day} {hour} {weatherData} />
					{/each}
				</article>
			{/each}
		{/if}
		<div>
			<button class="day-marker" on:click={() => (showFuture = !showFuture)}>
				<p>
					{showFuture ? 'Hide' : 'View'} future forcasts
				</p>
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	.timeline {
		margin-top: 50px;
		width: 100vw;
		max-width: fit-content;
		margin-right: auto;
		margin-left: auto;
		overflow-x: auto;
		transform: translateZ(0);

		// firefox
		scrollbar-width: thin;
		scrollbar-color: #fff1 #fff1;

		// chrome
		/* width */
		&::-webkit-scrollbar {
			height: 0.5rem;
		}
		/* Track */
		&::-webkit-scrollbar-track {
			background: #fff1;
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: #fff1;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: #fff2;
		}
	}
	.track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: min-content;
		padding: 3rem 5rem 1rem 5rem;
		width: max-content;
	}
	.day {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: min-content;
	}
	.day-marker {
		margin-left: 1rem;
		position: sticky;
		left: 0;
		writing-mode: vertical-rl;
		text-orientation: mixed;
		z-index: 10;
		font-weight: 800;
		height: fit-content;
		color: #fffe;
		background: none;
		border: none;

		p {
			writing-mode: vertical-rl;
			text-orientation: mixed;
			margin: 0;
		}
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: var(--color-main-dark);
			z-index: -1;
			filter: blur(5px);
		}
	}

	button {
		&:hover {
			cursor: pointer;
		}
	}
</style>
