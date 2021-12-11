<script lang="ts">
	import type { PhotonResult } from '$lib/types/photon-api';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { weatherLocations } from '$lib/store';

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
		} else if (trimmed == '') {
			result = null;
			lastQueryValue = trimmed;
		}
	};

	const clear = () => {
		result = null;
		lastQueryValue = '';
		queryValue = '';
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
					lat: feature.geometry.coordinates[1],
					lon: feature.geometry.coordinates[0]
				},
				id: feature.properties.osm_id,
				name: feature.properties.name,
				feature: feature,
				lastFetch: 0
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
	<h2>Add a location</h2>
	<form on:submit|preventDefault={() => searchLocation(queryValue)}>
		<input type="text" name="query" bind:value={queryValue} placeholder="ex: vancouver" size="1" />
		<button>search</button>
	</form>

	<div class="items">
		{#if locationList.length > 0}
			<button
				class="item clear"
				in:fly|local={{ y: -10, duration: 300 }}
				out:fly|local={{ y: 10, duration: 300 }}
				on:click={clear}
			>
				<div class="left">
					<p class="title">clear results</p>
				</div>
			</button>
		{/if}
		{#each locationList as item, index (item.id)}
			<button
				class="item"
				class:added={item.added}
				in:fly|local={{ y: -10, duration: 300, delay: (index + 1) * 20 }}
				out:fly|local={{ y: 10, duration: 300, delay: (index + 1) * 20 }}
				animate:flip={{ duration: 300 }}
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
</section>

<style lang="scss">
	.search {
		position: relative;
		@include mid-width;
	}

	h2 {
		margin-top: 0;
		margin-bottom: 0.2rem;
		padding-top: 1rem;
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
		transition: opacity 0.2s ease, box-shadow 0.5s ease;

		&.clear {
			padding: 0.5rem 1rem;
		}
		&:hover {
			cursor: pointer;
			.left {
				transform: scale(1.1);
				transition: transform 0.1s ease;
			}
		}
		&:active {
			transition: opacity 0.2s ease, box-shadow 0.1s ease;
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
		&.added {
			opacity: 0.5;
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
			transition: transform 0.2s ease, opacity 0.2s ease;
			&.added {
				opacity: 0.5;
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
