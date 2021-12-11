<script lang="ts">
	import '$lib/styles/_global.scss';
</script>

<nav>
	<div>
		<a href="/">locations</a>
		<a href="/weather">weather</a>
		<a href="/about">about</a>
	</div>
</nav>

<div class="background" />
<div class="stacking-slot">
	<slot />
</div>

<footer class="mid-width">
	<p>By Donny Wu</p>
</footer>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
		width: calc(100% + 100vw - 100% );
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

</style>
