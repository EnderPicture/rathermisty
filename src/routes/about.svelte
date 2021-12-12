<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
</script>

<PageTransition>
	<section>
		<p>
			Rather misty is a simple weather app that shows all the great data from the open metro
			project. Made to be used online and offline, it's is useful for stargazing, hiking, drone
			flight planning, photography, or anywhere one needs a weather forecast.
		</p>
		<p>
			It loads a 7 day per hour forecast and saves it on the device for later usage. It also loads 2
			days of past per hour forecast for looking at trends.
		</p>
	</section>
</PageTransition>

<style lang="scss">
	section {
		@include mid-width;
	}
</style>
