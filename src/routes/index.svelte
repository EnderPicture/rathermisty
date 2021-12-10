<script lang="ts">
	import LocationList from '$lib/components/LocationList.svelte';
	import LocationSelector from '$lib/components/LocationSearch.svelte';
</script>

<div class="background" />

<header>
	<div class="title">
		<h1>RatherMisty</h1>
		<img src="/imgs/logo.svg" alt="" />
	</div>
	<h2>a no frills weather app</h2>
</header>

<LocationSelector />
<LocationList />

<style lang="scss">
	header {
		@include mid-width;
	}
	.title {
		margin-top: 5rem;
		display: flex;
		align-items: center;
		h1 {
			font-size: 2.5rem;
			margin: 0;
		}
		img {
			margin-left: 0.5rem;
			height: 4rem;
		}
	}
	h2 {
		margin: 0;
		font-weight: normal;
	}
	.background {
		background-image: linear-gradient(to bottom, var(--color-main-light), var(--color-main-dark));
		position: absolute;
		z-index: -1;
		max-width: initial;
		width: 100%;
		height: calc(100vh - $nav-height);
	}
</style>
