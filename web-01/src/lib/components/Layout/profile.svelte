<script>
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { LogOut, User } from '@lucide/svelte';
  import { isLoading } from '$lib';

  let user = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  let anchorEl = null;
  let open = false;
  
  const handleClick = (/** @type {{ currentTarget: any; }} */ event) => {
    anchorEl = event.currentTarget;
    open = !open;
  };
  
  const handleClose = () => {
    open = false;
  };
  
  const handleLogout = (/** @type {string} */ action) => {
    handleClose();
    isLoading.update(val => !val);
  };
</script>

<style>
  @import './profile.css';
</style>

<div class="user-menu flex">
  <button class="my-auto mr-5" on:click={handleClick}>
     <User size={50} absoluteStrokeWidth color="rgb(0, 43, 103)"/>
  </button>
  
  {#if open}
    <div class="menu-backdrop" role="none" on:click|self={handleClose} transition:fade={{ duration: 150 }}>
      <div class="menu-paper" transition:fly={{ y: -10, duration: 200, easing: quintOut }}>
        <div class="p-4 border-b-1 border-gray-100 text-left">
          <h2 class="">{user.name}</h2>
          <p class="text-[0.9rem] text-[#666]">{user.email}</p>
        </div>
        
        <ul class="menu-list">
            <a href='/dashboard/settings/profile' class="menu-item" on:click={() => handleClose()}>
              <User/>
              <span class="ml-4">Profile</span>
            </a>
            <li role="none" class="menu-item" on:click={() => handleLogout()}>
              <LogOut/>
              <span class="ml-4">Logout</span>
            </li>
        </ul>
      </div>
    </div>
  {/if}
</div>