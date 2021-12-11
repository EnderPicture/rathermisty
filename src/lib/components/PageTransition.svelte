<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	function spin(node: HTMLElement, { duration }: { duration: number }) {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicInOut(t);

				return `
          opacity: ${eased};
          // height: ${node.clientHeight};
					// transform: translateX(${(1 - eased) * 100}px);
					`;
			}
		};
	}
</script>

<main transition:fade={{ duration: 10000 }}>
	<slot />
</main>

<style lang="scss">
	main {
		grid-area: 1/1/2/2;
		position: relative;
		padding-top: $nav-height;
	}
</style>
