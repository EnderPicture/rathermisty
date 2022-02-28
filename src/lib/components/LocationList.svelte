<script lang="ts">
	import { weatherLocations } from '$lib/store';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { selectedLocation } from '$lib/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const removeLocation = (id: number) => {
		const index = $weatherLocations.map((l) => l.id).indexOf(id);
		weatherLocations.update((d) => {
			d.splice(index, 1);
			return d;
		});
	};
	const viewLocation = (id: number) => {
		$selectedLocation = id;
		if ($page.path === '/') {
			document.body.scrollIntoView({ behavior: 'smooth' });
		} else {
			goto('/');
		}
	};
</script>

<section class="loc-list">
	<h2>Favorate locations</h2>
	<div class="items">
		{#each $weatherLocations as location, index (location)}
			<button
				class="item"
				in:fly|local={{ y: -10, duration: 300 }}
				out:fly|local={{ y: 10, duration: 300 }}
				animate:flip={{ duration: 300 }}
				on:click={() => viewLocation(location.id)}
			>
				<div class="left">
					<p class="title">{location.feature.properties.name || ''}</p>
					<p>
						{location.feature.properties.state || ''}
						{location.feature.properties.country || ''}
					</p>
				</div>
				<p class="right">view</p>
			</button>
		{/each}
	</div>
	{#if $weatherLocations.length === 0}
		<p>no favorate locations, add one above</p>
	{/if}
</section>

<style lang="scss">
	.loc-list {
		@include mid-width;
	}
	h2 {
		margin-top: 0;
		margin-bottom: 0.2rem;
		padding-top: 1rem;
	}
	.items {
		display: grid;
		grid-template-rows: auto;
	}
	.item {
		height: 100%;
		width: 100%;
		padding: 0.3rem 1rem;
		display: flex;
		align-items: center;
		border: none;
		color: #fffe;
		background-color: #fff1;
		position: relative;
		transition: opacity 0.2s ease, box-shadow 0.5s ease;
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
			font-size: 1rem;
			transition: transform 0.2s ease, opacity 0.2s ease;
		}
		p {
			margin: 0;
		}
	}
	.title {
		font-weight: bold;
	}
</style>
