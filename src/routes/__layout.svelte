<script lang="ts">
	import '$lib/styles/_global.scss';
</script>

<nav>
	<div>
		<a href="/">weather</a>
		<a href="/locations">locations</a>
		<a href="/about">about</a>
	</div>
</nav>

<div class="background" />
<div class="stacking-slot">
	<slot />
</div>

<footer class="mid-width">
	<!-- <p>By Donny Wu</p> -->
	<p>
		Weather data from
		<a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer"> Open-Meteo </a>
	</p>
</footer>

<style lang="scss">
	.stacking-slot {
		display: grid;
	}

	footer {
		max-width: $width;
		margin: auto;
		padding-left: $side-padding;
		padding-right: $side-padding;
	}

	nav {
		height: $nav-height;
		position: fixed;
		background-color: var(--color-main-light);
		width: calc(100% + 100vw - 100%);
		z-index: 100;
		display: flex;
		justify-content: center;
		div {
			width: 100%;
			max-width: $width;
			padding-left: $side-padding;
			padding-right: $side-padding;
			display: flex;
			height: 100%;

			align-items: center;

			a {
				color: #fffe;
				text-decoration: none;
			}

			* + * {
				margin-left: 1rem;
			}
		}
	}

	.background {
		background-image: linear-gradient(to bottom, var(--color-main-light), var(--color-main-dark));
		position: absolute;
		top: $nav-height;
		z-index: -1;
		max-width: initial;
		width: 100%;
		height: calc(100vh - $nav-height);
	}

	footer > p {
		max-width: 25rem;
		color: white;
		opacity: 0.8;

		a {
			color: inherit;
			transition: opacity 0.5s ease;
			will-change: opacity;
			&:hover {
				transition: opacity 0.1s ease;
				opacity: 0.5;
			}
			&:active {
				transition: opacity 0.1s ease;
				opacity: 0.4;
			}
		}
	}
</style>
