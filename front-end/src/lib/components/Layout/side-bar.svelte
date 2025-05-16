<script>
    import { Home, Settings, MapIcon } from '@lucide/svelte';
</script>
<div id='sidebar' class="w-[70px] flex flex-col gap-3 items-center pt-5 border-r-1 border-gray-300">
    <Home size={50} absoluteStrokeWidth/>
    <MapIcon size={50} absoluteStrokeWidth/>
    <Settings size={50} absoluteStrokeWidth/>
</div>