<script>
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { LogOut, User } from '@lucide/svelte';// User data - replace with your actual user data
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
  
  const handleMenuItemClick = (/** @type {string} */ action) => {
    handleClose();
    console.log(`Selected: ${action}`);
    // Add your action handlers here
    if (action === 'Logout') {
      // Handle logout logic
    }
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
            <li role="none" class="menu-item" on:click={() => handleMenuItemClick()}>
              <User/>
              <span class="ml-4">Profile</span>
            </li>
            <li role="none" class="menu-item" on:click={() => handleMenuItemClick()}>
              <LogOut/>
              <span class="ml-4">Logout</span>
            </li>
        </ul>
      </div>
    </div>
  {/if}
</div>