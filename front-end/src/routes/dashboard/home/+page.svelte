<script>
    import { Power,Zap, Moon, Bot, ArrowUpRight } from '@lucide/svelte';
    import {Button,toastStore, modalStore} from '$lib'
    
    /**
     * @typedef {Object} AGV
     * @property {string} id
     * @property {string} name
     * @property {string} status
     */
    let agvs = [
        {
            name: 'Alpha',
            id: ' f59a2af3-1bd4-4480-99e2-d843c2a8a948',
            status: 'off',
        },
    ];
    function success(){
        toastStore.set({
            title: 'Success',
            description: 'Operation successful',
            type: 'success'
        });
    }
    /**
     * @param {AGV} agv
     */
    function startAGV(agv) {
        agv.status = 'online';
        agvs = [...agvs];
        success()
    }
    /**
     * @param {AGV} agv
     */
    function sleepAGV(agv) {
        agv.status = 'sleep';
        agvs = [...agvs];
        success()
    }
    /**
     * @param {AGV} agv
     */
    function completeShutdown(agv){
        agv.status = 'off';
        agvs = [...agvs];
        success()
    }
    /**
     * @param {AGV} agv
     */
    function shutdownAGV(agv) {
        modalStore.set({
            open: true,
            title: 'Confirm Shutdown',
            content: 'Are you sure you want to shut down the AGV? Once shut down, it cannot be started remotely and will require manual intervention to power it back on.',
            confirmText: 'Confirm',
            cancelText: 'No',
            onConfirm: () => completeShutdown(agv),
        });
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
        status: 'off',
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
                externalClass={`${action.class} btn ${agv.status === 'off' && action.name === 'Sleep' ? 'btn-disabled' : ''}`}
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
