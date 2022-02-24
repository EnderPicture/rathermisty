<script lang="ts">
	import LocationList from '$lib/components/LocationList.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import LocationSelector from '$lib/components/LocationSearch.svelte';
</script>

<PageTransition>
	<LocationSelector />
	<LocationList />
</PageTransition>
