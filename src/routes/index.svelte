<script lang="ts">
	import LocationSelector from '$lib/components/LocationSelector.svelte';
</script>

<div class="background" />

<p>A weather app that gives you all the data in a pleasing way</p>

<LocationSelector />

<style lang="scss">
	* {
		@include mid-width;
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
