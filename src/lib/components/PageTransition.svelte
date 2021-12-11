<script lang="ts">
	import { cubicInOut } from 'svelte/easing';

	function flyIn(node: HTMLElement, { duration }: { duration: number }) {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicInOut(t);

				return `
          opacity: ${eased};
					transform: translateY(${(1 - eased) * -5}px);
					`;
			}
		};
	}
</script>

<main transition:flyIn={{ duration: 150 }}>
	<slot />
</main>

<style lang="scss">
	main {
		grid-area: 1/1/2/2;
		position: relative;
		padding-top: $nav-height;
	}
</style>
