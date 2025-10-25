<script>
  import {UserMenu} from '@sierra-95/svelte-ui'
  import { goto } from '$app/navigation';
  import {user} from '$lib'
  
  export let toggleMenu;
  $: User = {
    name: $user?.id,
    email: $user?.email
  }
  const handleProfile = () => {
    goto('/settings');
  };
  const handleLogout = () => {
    user.set(null);
    goto('/logout');
  };
</script>
<style>
  @import './header.css';
</style>
<header class="w-full flex justify-between h-[70px] border-b-1 border-gray-300">
  <div class="flex items-center div2">
    <div class="menu-button ml-2 cursor-pointer" role="none" on:click={toggleMenu}>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <img src="/logo-black.png" alt="Logo" class="ml-4 w-15"/>
  </div>
  <UserMenu
    user={User} 
    absolute="right"  
    onProfile={handleProfile}
    onLogout={handleLogout}
  />
</header>