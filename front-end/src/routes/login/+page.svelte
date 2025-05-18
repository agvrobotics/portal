<script>
	import { enhance } from '$app/forms';
  import {Button} from '$lib'
  import { Eye, EyeOff } from '@lucide/svelte';
   import { page } from '$app/stores';
  
  let email = '';
  let password = '';
  let showPassword = false;
  let turnstileToken = "";
  let isLoading = false;

  const handleLogin = () => {
    alert("Logging in");
  };
</script>
  
<style>  
  @import './login.css';
</style>


<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<main class="h-screen">
  <div style="height: calc(100vh - 100px);" class="flex">
    <form
      method="POST" 
      use:enhance
      on:submit={() => isLoading = true}
      class="container flex flex-col gap-4 max-w-[600px] my-auto mx-auto max-[600px]:mx-6"
    >  
      <h2 class="text-center text-3xl mb-4">Dekut 2025 AGV Robotics</h2>

      {#if $page.form?.error}
        <div class="error">{$page.form.error}</div>
      {/if}
      
      <!--Email-->
      <div class="w-full">
        <label for="email">Email</label>
        <input class="w-full" type="email" id="email" bind:value={email}/>
      </div>
      <!--Password-->
      <div class="w-full">
        <label for="password">Password</label>
        <div class="password-container">
          <input 
            class="w-full"
            type={showPassword ? "text" : "password"} 
            id="password" 
            bind:value={password} 
          />
          <button class="toggle-password" on:click|preventDefault={() => showPassword = !showPassword}>
            {#if showPassword}
              <Eye/>
            {:else}  
              <EyeOff/>
            {/if}
          </button>
        </div>
      </div>  
      <!--Turnstile-->
      <div
        class="cf-turnstile"
        data-sitekey="0x4AAAAAABdtnf8oh8_LBi9N"
        data-callback="onVerify"
        data-theme="light"
        data-size='flexible'
      ></div>
      <Button 
        color="primary" 
        onClick={handleLogin} 
        disabled={isLoading}
        externalClass="mt-4 w-full"
      >Log In</Button>  
    </form>
  </div>
</main>