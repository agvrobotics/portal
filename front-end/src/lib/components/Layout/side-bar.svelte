<script>
	import { Home, Settings, MapIcon } from '@lucide/svelte';
	import { page } from '$app/state';

	const currentPath = page.url.pathname;

	const routes = {
		home: '/dashboard/home',
		map: '/dashboard/maps',
		settings: '/dashboard/settings'
	};

	const isActive = (/** @type {string} */ path) => currentPath === path;
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
	}
</style>

<div id="sidebar" class="w-[70px] flex flex-col gap-3 items-center pt-5 border-r-1 border-gray-300">
	<div class="icon-base icon-hover {isActive(routes.home) ? 'icon-active' : ''}">
		<Home size={50} absoluteStrokeWidth color="rgb(0, 43, 103)" />
	</div>
	<div class="icon-base icon-hover {isActive(routes.map) ? 'icon-active' : ''}">
		<MapIcon size={50} absoluteStrokeWidth color="rgb(0, 43, 103)"  />
	</div>
	<div class="icon-base icon-hover {isActive(routes.settings) ? 'icon-active' : ''}">
		<Settings size={50} absoluteStrokeWidth color="rgb(0, 43, 103)"  />
	</div>
</div>
