<script lang="ts">
  	import '../app.css';
	import { onMount } from 'svelte';
	import { user,Header, Menu} from '$lib';
	import {LinearProgress, isMobile, isLoading} from '@sierra-95/svelte-ui';

	let { children, data } = $props();
	let isMenuOpen = $state(false);
	
	$effect(() => {
		if ($isMobile) isMenuOpen = false;
	});

	onMount(() => {
		user.set(data.user.user);
		if($isMobile) return;
		if (typeof localStorage !== 'undefined') {
			const stored = localStorage.getItem('isMenuOpen');
			if (stored === null) {
				localStorage.setItem('isMenuOpen', 'true');
				isMenuOpen = true;
			} else {
				isMenuOpen = stored === 'true';
			}
		}
	});
	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
		if($isMobile) return;
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('isMenuOpen', isMenuOpen.toString());
		}
	};
	const mobileMenuSelect = () => {
		if ($isMobile) isMenuOpen = false;
	};
</script>

<style>
	.menu-transition {
		transition: transform 0.3s ease, width 0.3s ease;
	}
</style>

<Header toggleMenu={toggleMenu}/>
{#if $isLoading}
	<LinearProgress />
{/if}
<!--Menu-->
<div class="flex w-full h-[calc(100vh-70px)] overflow-hidden">
	<div
		class="menu-transition h-full bg-white overflow-hidden border-r-1 border-gray-300"
		class:fixed={$isMobile}
		class:left-0={$isMobile}
		class:z-50={$isMobile}
		style={`width: ${isMenuOpen ? '300px' : $isMobile ? '0px' : '70px'}; transform: translateX(${$isMobile && !isMenuOpen ? '-100%' : '0'})`}
	>
		<Menu {isMenuOpen} mobileMenuSelect={mobileMenuSelect} />
	</div>
	<!-- Content -->
	<div class="relative transition-all duration-300 overflow-y-auto" style={`width: ${$isMobile ? '100%' : isMenuOpen ? 'calc(100vw - 300px)' : 'calc(100vw - 70px)'};`}>
		{@render children()}
	</div>
</div>