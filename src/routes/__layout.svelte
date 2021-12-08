<nav>
	<div>
		<a href="/">home</a>
		<a href="/about">about</a>
	</div>
</nav>
<main>
	<slot />
</main>
<footer>
	<p>By Donny Wu</p>
</footer>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
		width: 100%;
		margin-right: calc(100% - 100vw);
		z-index: 100;
		div {
			max-width: $width;
			margin: auto;
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

	main {
		padding-top: $nav-height;
	}

	:global(body) {
		--color-main-light: #{$blue-light};

		--color-main-dark-4: #{lighten($blue-dark, 14)};
		--color-main-dark-3: #{lighten($blue-dark, 11)};
		--color-main-dark-2: #{lighten($blue-dark, 8)};
		--color-main-dark-1: #{lighten($blue-dark, 5)};
		--color-main-dark: #{$blue-dark};

		margin: 0;
		font-family: 'Montserrat', sans-serif;

		margin-right: calc(100% - 100vw);
		overflow-x: hidden;

		background-color: $blue-dark;
		color: #fffe;
	}

	:global(:where(button, input, a)) {
		box-shadow: 0 0 0 0px #fff0;
		transition: box-shadow 0.5s ease;
		&:focus {
			z-index: 10;
			transition: box-shadow 0.1s ease;
			box-shadow: 0 0 0 2px #ffff;
			outline: none;
		}
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
