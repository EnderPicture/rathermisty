<script lang="ts">
	import type { Feature, PhotonResult } from '$lib/types/photon-api';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { sleep } from '$lib/helper';
	import { weatherLocations } from '$lib/store';

	let queryValue = '';

	let result: PhotonResult | null = null;
	let features: Feature[] = [];

	const searchLocation = (query: string) => {
		const trimmed = query.trim();
		if (trimmed != '') {
			fetch(`https://photon.komoot.io/api/?q=${trimmed}&osm_tag=place`)
				.then((data) => data.json())
				.then((json) => (result = json));
		}
	};

	$: result && update(result);

	const update = async (result: PhotonResult) => {
		if (result !== null) {
			for (let i = 0; i < result.features.length; i++) {
				features[i] = result.features[i];
				await sleep(20);
			}
			while (features.length - result.features.length > 0) {
				features.splice(result.features.length, 1);
				features = features;
				await sleep(20);
			}
		}
	};

	const addLoc = (index) => {
		let feature = features[index];
		weatherLocations.update((d) => {
			d.push({
				cords: {
					lat: feature.geometry.coordinates[0],
					lon: feature.geometry.coordinates[1]
				},
				name: feature.properties.name,
				feature: feature
			});
			return d;
		});
	};
	const removeLocation = (index) => {
		weatherLocations.update((d) => {
			d.splice(index, 1);
			return d;
		});
	};

	$: console.log($weatherLocations);
</script>

<section class="search">
	<div class="background" />

	{#if $weatherLocations.length > 0}
		<h2>Favorate locations</h2>
		<div class="items">
			{#each $weatherLocations as location, index (location)}
				<button
					class="item"
					in:fly={{ y: -20, duration: 500 }}
					out:fly={{ y: 20, duration: 500 }}
					animate:flip={{ duration: 500 }}
					on:click={() => removeLocation(index)}
				>
					<div class="left">
						<p class="title">{location.feature.properties.name || ''}</p>
						<p>
							{location.feature.properties.state || ''}
							{location.feature.properties.country || ''}
						</p>
					</div>
					<p class="right">-</p>
				</button>
			{/each}
		</div>
	{/if}

	<h2>Search a location</h2>
	<form on:submit|preventDefault={() => searchLocation(queryValue)}>
		<input type="text" name="query" bind:value={queryValue} placeholder="ex: vancouver" size="1" />
		<button>search</button>
	</form>

	{#if features.length > 0}
		<div class="items">
			{#each features as feature, index (feature)}
				<button
					class="item"
					in:fly={{ y: -20, duration: 500 }}
					out:fly={{ y: 20, duration: 500 }}
					animate:flip={{ delay: 1000 }}
					on:click={() => addLoc(index)}
				>
					<div class="left">
						<p class="title">{feature.properties.name || ''}</p>
						<p>{feature.properties.state || ''} {feature.properties.country || ''}</p>
					</div>
					<p class="right">+</p>
				</button>
			{/each}
		</div>
	{/if}
</section>

<style lang="scss">
	.search {
		position: relative;
		> * {
			padding-right: $side-padding;
			padding-left: $side-padding;
			max-width: $width;
			margin-left: auto;
			margin-right: auto;
		}
	}

	h2 {
		margin-top: 0;
		margin-bottom: .2rem;
		padding-top: 1rem;
	}

	.background {
		background-image: linear-gradient(to bottom, var(--color-main-light), var(--color-main-dark));
		position: absolute;
		z-index: -1;
		max-width: initial;
		width: 100%;
		height: calc(100vh - $nav-height);
	}

	form {
		display: flex;
		border-radius: 6px;
		margin-bottom: .5rem;
		input {
			flex: 1;
			border-radius: 6px 0 0 6px;
		}
		button {
			border-radius: 0 6px 6px 0;
		}
		input,
		button {
			border: none;
			font-size: 1rem;
			padding: 0.5rem 1rem;
			background-color: #fff1;

			color: #fffe;
			&::placeholder {
				color: #fff6;
			}
		}
	}

	.items {
		display: grid;
		grid-template-rows: minmax(2.5rem, auto);
	}
	.item {
		height: 100%;
		width: 100%;
		padding: 0.1rem 1rem;
		display: flex;
		align-items: center;
		border: none;
		color: #fffe;
		background-color: #fff1;
		&:hover {
			cursor: pointer;
			.left {
				transform: scale(1.1);
				transition: transform 0.1s ease;
			}
		}
		&:active {
			cursor: pointer;
		}
		&:first-child {
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
		}
		&:last-child {
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
		}
		.left {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: start;
			justify-content: center;
			transition: transform 0.5s ease;
			transform-origin: 0 50%;
		}
		.right {
			font-size: 2rem;
		}
		p {
			margin: 0;
		}
	}
	.title {
		font-weight: bold;
	}
</style>
