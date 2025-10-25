import { Home, Settings, MapIcon } from '@lucide/svelte';
export const routes = {
		home: '/',
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