<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';

	function flyOut(node: HTMLElement, { duration }: { duration: number }) {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicIn(t);

				return `
          opacity: ${eased};
					transform: translateY(${(1 - eased) * 15}px);
					`;
			}
		};
	}
	function flyIn(node: HTMLElement, { duration }: { duration: number }) {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicOut(t);

				return `
          opacity: ${eased};
					transform: translateY(${(1 - eased) * -15}px);
					`;
			}
		};
	}
</script>

<main in:flyIn={{ duration: 150 }} out:flyOut={{ duration: 150 }}>
	<slot />
</main>

<style lang="scss">
	main {
		grid-area: 1/1/2/2;
		position: relative;
		padding-top: $nav-height;
	}
</style>
