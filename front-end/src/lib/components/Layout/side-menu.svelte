<script>
	import { Home, Settings, MapIcon } from '@lucide/svelte';
    import { page } from '$app/stores';

    $: currentPath = $page.url.pathname;

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
        align-items: center;
		width: 95%;
		padding: 10px 0px;
		cursor: pointer;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
	}
	.icon-active {
		background-color: rgb(236, 244, 255);
        border-left: 1px solid rgb(185, 214, 255);
        border-top: 1px solid rgb(185, 214, 255);
        border-bottom: 1px solid rgb(185, 214, 255);
	}
    h2{
        display: flex;
        width: 50%;
        margin-left: 10px;
    }
</style>
<div class="swiper-slide menu border-r-1 border-gray-300">
    <div class="w-full h-[70px]"></div>
    <div class=" flex flex-col gap-3 pt-5 items-end">
        <!--Dont change pt-5-->
        <a href={routes.home}  class="icon-base {isActive(routes.home) ? 'icon-active' : ''}">
            <Home size={50} absoluteStrokeWidth color="rgb(0, 43, 103)" />
            <h2>Home</h2>
        </a>
        <a href={routes.map} class="icon-base {isActive(routes.map) ? 'icon-active' : ''}">
            <MapIcon size={50} absoluteStrokeWidth color="rgb(0, 43, 103)"  />
            <h2>Maps</h2>
        </a>
        <a href={routes.settings} class="icon-base {isActive(routes.settings) ? 'icon-active' : ''}">
            <Settings size={50} absoluteStrokeWidth color="rgb(0, 43, 103)"  />
            <h2>Settings</h2>
        </a>
    </div>
</div>