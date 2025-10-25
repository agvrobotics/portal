<script>
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { Home, Settings, MapIcon } from '@lucide/svelte';
	import {isLoading} from '@sierra-95/svelte-ui'

	export let toggleMenu = () => {};
	export let isMenuOpen;

	let size = 30;
	
	beforeNavigate(() => isLoading.set(true));
	afterNavigate(() => isLoading.set(false));

	export const routes = {
		home: '/home',
		maps: '/maps',
		settings: '/settings'
	};
	export const sections = [
		{
			label: '',
			items: [
				{ path: routes.home, label: 'Home', icon: Home }
			]
		},
		{
			label: 'Slam-toolbox',
			items: [
				{ path: routes.maps, label: 'Saved Maps', icon: MapIcon },
			]
		},
		{
			label: '',
			items: [
				{ path: routes.settings, label: 'Settings', icon: Settings }
			]
		}
	];
</script>

<style>
    @import './menu.css';
</style>
<div id='side-menu' class="flex flex-col gap-3 items-end pt-5">
	{#each sections as section, i}
		{#if section.label}
			<div class="w-5/6">
				<h2 class:hidden={!isMenuOpen} class="text-dk-blue text-sm">{section.label}</h2>
				<hr class="text-[#D1D5DB]"/>
			</div>
		{/if}

		{#each section.items as item}
			<a  title={item.label}
				href={item.path}
				on:click={toggleMenu}
				class="icon-base"
				class:icon-base_radius_override={!isMenuOpen}
				class:icon-active={
					$page.url.pathname.startsWith(item.path)
				}

			>
				<svelte:component this={item.icon} size={size} absoluteStrokeWidth color="rgb(0, 43, 103)" />
				<h2 class:hidden={!isMenuOpen}>{item.label}</h2>
			</a>
		{/each}

		{#if i === sections.length - 2}
			<hr class="w-[80%] text-[#D1D5DB]"/>
		{/if}
	{/each}
</div>
