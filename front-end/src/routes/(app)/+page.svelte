<script>
    import { Bot, ArrowUpRight } from '@lucide/svelte';
    let agvs = [
        {
            name: 'Alpha',
            id: ' f59a2af3-1bd4-4480-99e2-d843c2a8a948',
            status: 'off',
        },
    ];
</script>

<div class="grid gap-4 p-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
  {#each agvs as agv}
    <div class="rounded-md p-4 shadow-lg flex flex-col gap-2 relative max-w-[400px]">
        <h2 class="text-left text-[1.2rem] flex ">
            <span class="flex">
                <Bot color="rgb(0, 43, 103)"/>
                <a href={`/dashboard/${agv.id}`} class="font-bold ml-2 mr-2 underline">{agv.name}</a>
            </span>
            <span class="rounded-lg my-auto text-sm text-center min-w-[50px] status-{agv.status}">{agv.status}</span>
        </h2>
        <h2 class="absolute right-5 text-[0.9rem] text-[#056DFF] flex">
            <a href={`/dashboard/${agv.id}`} class="underline">View details</a><ArrowUpRight size={20}/>
        </h2>
        <div class="text-[#666] text-[1rem] text-left">{agv.id}</div>
    </div>
  {/each}
</div>

<style>
 .status-online {
    background-color: #e6f7ee;
    color: rgb(0, 43, 103);
  }
  
  .status-sleep {
    background-color: #eef2ff;
    color: #6366f1;
  }
  
  .status-off {
    background-color: #ccc;
    color: white;
  }
</style>