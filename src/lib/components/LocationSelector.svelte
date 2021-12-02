<script lang="ts">
	import type { Feature, PhotonResult } from '$lib/types/photon-api';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { sleep } from '$lib/helper';

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
</script>

<section class="search">
	<h2>please enter in location</h2>
	<form on:submit|preventDefault={() => searchLocation(queryValue)}>
		<input type="text" name="query" bind:value={queryValue} placeholder="ex: vancouver" size="1" />
		<button>search</button>
	</form>
	<div class="dropdown">
		<div class="items">
			{#each features as feature, index (feature)}
				<button
					class="item"
					in:fly={{ y: -20, duration: 500 }}
					out:fly={{ y: 20, duration: 500 }}
					animate:flip={{ delay: 1000 }}
				>
					<div class="con">
						<p class="title">{feature.properties.name || ''}</p>
						<p>{feature.properties.state || ''} {feature.properties.country || ''}</p>
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.search {
		max-width: $width;
		padding-right: $side-padding;
		padding-left: $side-padding;
		margin: auto;
	}

	form {
		display: flex;
		input {
			flex: 1;
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
		grid-template-rows: repeat(15, 2.5rem);
		gap: .5rem;
	}
	.item {
		display: block;
		border: none;
		width: 100%;
		text-align: start;
		color: #fffe;
		background-color: var(--color-main-dark-2);
		padding: 0;
		.con {
			height: 100%;
			width: 100%;
			padding: 0 0.5rem;
			background-color: var(--color-main-dark-1);
			transition: transform 0.5s ease;
			display: flex;
			flex-direction: column;
			justify-content: center;
			> p {
				margin: 0;
			}
		}
		&:hover {
			.con {
				transition: transform 0.1s ease;
				transform: translateY(-0.5rem);
			}
			cursor: pointer;
		}
	}
	.title {
		font-weight: bold;
	}
</style>
