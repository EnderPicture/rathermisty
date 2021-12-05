<script lang="ts">
	import type { Feature, PhotonResult } from '$lib/types/photon-api';
	import { crossfade, fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { sleep } from '$lib/helper';
	import { weatherLocations } from '$lib/store';
	import { listen, object_without_properties } from 'svelte/internal';

	let queryValue = '';
	let lastQueryValue = '';
	let lastQueryDone = true;

	let result: PhotonResult | null = null;

	const searchLocation = (query: string) => {
		const trimmed = query.trim();
		if (lastQueryDone && trimmed != '' && trimmed !== lastQueryValue) {
			lastQueryDone = false;
			lastQueryValue = trimmed;
			fetch(`https://photon.komoot.io/api/?q=${trimmed}&osm_tag=place`)
				.then((data) => data.json())
				.then((json) => {
					result = json;
					lastQueryDone = true;
				});
		}
	};

	$: ids = $weatherLocations.map((location) => location.feature.properties.osm_id);
	$: locationList =
		result?.features.map((feature) => {
			return {
				feature: feature,
				id: feature.properties.osm_id,
				added: ids.includes(feature.properties.osm_id)
			};
		}) || [];

	const addLoc = (id: number) => {
		console.log(id);
		let listItem = locationList[locationList.map((f) => f.id).indexOf(id)];
		let feature = listItem.feature;
		weatherLocations.update((d) => {
			d.push({
				cords: {
					lat: feature.geometry.coordinates[0],
					lon: feature.geometry.coordinates[1]
				},
				id: feature.properties.osm_id,
				name: feature.properties.name,
				feature: feature
			});
			return d;
		});
	};
	const removeLocation = (id: number) => {
		const index = $weatherLocations.map((l) => l.id).indexOf(id);
		weatherLocations.update((d) => {
			d.splice(index, 1);
			return d;
		});
	};
</script>

<section class="search">
	<div class="background" />

	<h2>Search a location</h2>
	<form on:submit|preventDefault={() => searchLocation(queryValue)}>
		<input type="text" name="query" bind:value={queryValue} placeholder="ex: vancouver" size="1" />
		<button>search</button>
	</form>

	<div class="items">
		{#each locationList as item, index (item.id)}
			<button
				class="item"
				in:fly={{ y: -20, duration: 500, delay: index * 20 }}
				out:fly={{ y: 20, duration: 500, delay: index * 20 }}
				animate:flip={{ duration: 500 }}
				on:click={() => (item.added ? removeLocation(item.id) : addLoc(item.id))}
			>
				<div class="left">
					<p class="title">{item.feature.properties.name || ''}</p>
					<p>{item.feature.properties.state || ''} {item.feature.properties.country || ''}</p>
				</div>
				<p class="right" class:added={item.added}>+</p>
			</button>
		{/each}
	</div>

	<h2>Favorate locations</h2>
	<div class="items">
		{#each $weatherLocations as location, index (location)}
			<button
				class="item"
				in:fly={{ y: -20, duration: 500 }}
				out:fly={{ y: 20, duration: 500 }}
				animate:flip={{ duration: 500 }}
				on:click={() => removeLocation(location.id)}
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
	{#if $weatherLocations.length === 0}
		<p transition:fade>no favorate locations, add one above</p>
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
		margin-bottom: 0.2rem;
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
		margin-bottom: 0.5rem;
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
		grid-template-rows: auto;
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
		position: relative;
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
			transition: transform 0.5s ease;
			&.added {
				transform: rotate(45deg);
			}
		}
		p {
			margin: 0;
		}
	}
	.title {
		font-weight: bold;
	}
</style>
