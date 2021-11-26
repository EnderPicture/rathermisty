<header>
	<p>test</p>
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

	header, footer {
    max-width: $width;
    margin: auto;
	}

	:global(body) {
		margin: 0;
		font-family: 'Montserrat', sans-serif;

		margin-right: calc(100% - 100vw);
		overflow-x: hidden;

		* {
			box-sizing: border-box;
		}
	}
</style>
