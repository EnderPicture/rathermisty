<header>
	<nav>
		<a href="/">home</a>
		<a href="/about">about</a>
	</nav>
</header>
<main>
	<slot />
</main>
<footer>
	<p>By Donny Wu</p>
</footer>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	header,
	footer {
		max-width: $width;
		margin: auto;
	}

	:global(body) {

		--color-main-light: $blue-light;

		--color-main-dark-4: #{lighten($blue-dark, 20)};
		--color-main-dark-3: #{lighten($blue-dark, 15)};
		--color-main-dark-2: #{lighten($blue-dark, 10)};
		--color-main-dark-1: #{lighten($blue-dark, 5)};
		--color-main-dark-0: #{$blue-dark};

		margin: 0;
		font-family: 'Montserrat', sans-serif;

		margin-right: calc(100% - 100vw);
		overflow-x: hidden;

		background-color: $blue-dark;
		color: #fffe;
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
