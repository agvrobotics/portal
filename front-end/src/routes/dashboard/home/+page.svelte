<script>
  import { Power,Zap, Moon } from '@lucide/svelte';
  import {Button} from '$lib'

  let agvs = [
    {
      name: 'Alpha',
      id: ' f59a2af3-1bd4-4480-99e2-d843c2a8a948',
      status: 'hibernation',
    },
  ];

  // @ts-ignore
  function startAGV(agv) {
    agv.status = 'online';
  }
  // @ts-ignore
  function sleepAGV(agv) {
    agv.status = 'sleep';
  }
  // @ts-ignore
  function shutdownAGV(agv) {
    agv.status = 'hibernation';
  }
    const actions = [
        {
        name: 'Start',
        icon: Zap,
        status: 'online',
        class: 'start',
        handler: (/** @type {{ status: string; }} */ agv) => agv.status = 'online',
        },
        {
        name: 'Sleep',
        icon: Moon,
        status: 'sleep',
        class: 'sleep',
        handler: (/** @type {{ status: string; }} */ agv) => agv.status = 'sleep',
        },
        {
        name: 'Shutdown',
        icon: Power,
        status: 'hibernation',
        class: 'shutdown',
        handler: (/** @type {{ status: string; }} */ agv) => agv.status = 'hibernation',
        },
    ];
</script>

<style>
    @import './agv.css';
</style>

<div class="grid">
  {#each agvs as agv}
    <div class="card flex flex-col gap-2">
      <h2 class="text-left text-[1.2rem]">
        <span class="font-bold">{agv.name}</span>
        <span class="status-indicator status-{agv.status}">Status: {agv.status}</span>
      </h2>
      <div class="text-[#666] text-[1rem] text-left">{agv.id}</div>
      <hr class="text-[#D1D5DB]" />

      <div class="flex gap-2">
        {#each actions as action}
          {#if agv.status !== action.status}
            <Button 
              onClick={() => action.handler(agv)}
              externalClass={`${action.class} btn`}
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
