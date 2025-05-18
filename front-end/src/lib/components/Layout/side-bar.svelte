<script>
	import { Home, Settings, MapIcon } from '@lucide/svelte';
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
	
	const routes = {
		home: '/dashboard/home',
		map: '/dashboard/maps',
		settings: '/dashboard/settings'
	};

	const isActive = (/** @type {string} */ path) => currentPath.startsWith(path);
</script>

<style>
	.icon-base {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 10px 0px;
		cursor: pointer;
	}
	.icon-active {
		background-color: rgb(236, 244, 255);
		border-top: 1px solid rgb(185, 214, 255);
        border-bottom: 1px solid rgb(185, 214, 255);
	}
	@media (max-width: 768px) {
		#sidebar{
			display: none;
		}
	}
</style>

<div id="sidebar" class="w-[70px] flex flex-col gap-3 items-center pt-5 border-r-1 border-gray-300">
	<!--Dont change pt-5-->
	<a href={routes.home} class="icon-base {isActive(routes.home) ? 'icon-active' : ''}">
		<Home size={50} absoluteStrokeWidth color="rgb(0, 43, 103)" />
	</a>
	<a href={routes.map} class="icon-base {isActive(routes.map) ? 'icon-active' : ''}">
		<MapIcon size={50} absoluteStrokeWidth color="rgb(0, 43, 103)"  />
	</a>
	<a href={routes.settings} class="icon-base {isActive(routes.settings) ? 'icon-active' : ''}">
		<Settings size={50} absoluteStrokeWidth color="rgb(0, 43, 103)"  />
	</a>
</div>
