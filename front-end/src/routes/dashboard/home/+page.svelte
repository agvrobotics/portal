<script>
    import { Power,Zap, Moon, Bot, ArrowUpRight } from '@lucide/svelte';
    import {Button} from '$lib'
    
    let agvs = [
        {
        name: 'Alpha',
        id: ' f59a2af3-1bd4-4480-99e2-d843c2a8a948',
        status: 'hibernation',
        },
    ];

    /**
	 * @param {{ status: string; }} agv
	 */
    function startAGV(agv) {
        agv.status = 'online';
        agvs = [...agvs];
    }
    /**
	 * @param {{ status: string; }} agv
	 */
    function sleepAGV(agv) {
        agv.status = 'sleep';
        agvs = [...agvs];
    }
    /**
	 * @param {{ status: string; }} agv
	 */
    function shutdownAGV(agv) {
        agv.status = 'hibernation';
        agvs = [...agvs];
    }

    const actions = [
        {
        name: 'Start',
        icon: Zap,
        status: 'online',
        class: 'start',
        handler: startAGV,
        },
        {
        name: 'Sleep',
        icon: Moon,
        status: 'sleep',
        class: 'sleep',
        handler: sleepAGV,
        },
        {
        name: 'Shutdown',
        icon: Power,
        status: 'hibernation',
        class: 'shutdown',
        handler: shutdownAGV,
        },
    ];
</script>

<style>
    @import './agv.css';
</style>

<div class="grid">
  {#each agvs as agv}
    <div class="card flex flex-col gap-2 relative">
        <h2 class="text-left text-[1.2rem] flex ">
            <span class="flex">
                <Bot color="rgb(0, 43, 103)"/>
                <a href={`/dashboard/${agv.id}`} class="font-bold ml-2 mr-2 underline">{agv.name}</a>
            </span>
            <span class="status-indicator status-{agv.status}">Status: {agv.status}</span>
        </h2>
        <h2 class="absolute right-5 text-[0.9rem] text-[#056DFF] flex">
            <a href={`/dashboard/${agv.id}`} class="underline">View details</a><ArrowUpRight size={20}/>
        </h2>
        <div class="text-[#666] text-[1rem] text-left">{agv.id}</div>
        <hr class="text-[#D1D5DB]" />

        <div class="flex gap-2">
            {#each actions as action}
            {#if agv.status !== action.status}
                <Button 
                onClick={() => action.handler(agv)}
                externalClass={`${action.class} btn ${agv.status === 'hibernation' && action.name === 'Sleep' ? 'btn-disabled' : ''}`}
                >
                <svelte:component this={action.icon} size="16" />
                {action.name}
                </Button>
            {/if}
            {/each}
        </div>
    </div>
  {/each}
</div>
