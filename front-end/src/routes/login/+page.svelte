<script>
	import { enhance } from '$app/forms';
  import {Button} from '@sierra-95/svelte-ui';
  import { Eye, EyeOff } from '@lucide/svelte';
  import { page } from '$app/stores';
  
  let email = '';
  let password = '';
  let showPassword = false;
  let isLoading = false;

  function handleEnhance() {
    isLoading = true;
    // @ts-ignore
    return async ({ update, result }) => {
      isLoading = false;
      await update(result);
    };
  } 
  
</script>
  
<style>  
  @import './login.css';
</style>


<!-- <svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head> -->

<main class="h-screen">
  <div style="height: calc(100vh - 100px);" class="flex">
    <form
      method="POST" 
      use:enhance={handleEnhance}
      class="container flex flex-col gap-4 max-w-[600px] my-auto mx-auto max-[600px]:mx-6"
    >  
      <h2 class="text-center text-3xl mb-4">Dekut 2025 AGV Robotics</h2>

      {#if $page.form?.error}
        <div class="error text-red-500">{$page.form.error}</div>
      {/if}
      <div class="w-full">
        <label for="email">Email</label>
        <input class="w-full" type="email" id="email" name="email" bind:value={email}/>
      </div>
      <div class="w-full">
        <label for="password">Password</label>
        <div class="password-container">
          <input 
            class="w-full"
            type={showPassword ? "text" : "password"} 
            id="password" 
            name="password"
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
      <!-- {#if showCaptcha}
        <div
          class="cf-turnstile"
          data-sitekey="0x4AAAAAABdtnf8oh8_LBi9N"
          data-callback="onVerify"
          data-theme="light"
          data-size='flexible'
        ></div>
      {/if} -->
      <Button 
        type="submit"
        isLoading={isLoading}
      >Log In</Button>  
    </form>
  </div>
</main>