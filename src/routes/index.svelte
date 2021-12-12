<script lang="ts">
	import LocationList from '$lib/components/LocationList.svelte';
	import LocationSelector from '$lib/components/LocationSearch.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
</script>

<PageTransition>
	<header>
		<div class="title">
			<h1>RatherMisty</h1>
			<img src="/imgs/logo.svg" alt="" />
		</div>
		<h2>a no frills weather app</h2>
	</header>

	<LocationSelector />
	<LocationList />
</PageTransition>

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
			font-weight: 900;
			margin: 0;
		}
		img {
			margin-left: 0.5rem;
			height: 4rem;
		}
		@media screen and (max-width : 375px)  {
			h1 {
				font-size: 2rem;
			}
			img {
				height: 3rem;
			}
		}
	}
	h2 {
		font-size: 1rem;
		margin: 0;
		margin-top: -.5rem;
		font-weight: normal;
	}
</style>
