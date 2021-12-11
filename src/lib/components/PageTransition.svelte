<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
</script>

<main transition:fade={{ duration: 50 }}>
	<slot />
</main>

<style lang="scss">
	main {
		grid-area: 1/1/2/2;
		position: relative;
		padding-top: $nav-height;
	}
</style>
