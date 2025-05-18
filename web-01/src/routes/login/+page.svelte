<script>
  import {Button} from '$lib'
  import { Eye, EyeOff } from '@lucide/svelte';
  let email = '';
  let password = '';
  let showPassword = false;

  const handleLogin = () => {
    alert("Logging in");
  };
  let turnstileToken = "";
</script>
  
<style>  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  input {
    padding: 0.75rem;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    font-size: 1rem;
  }
  input:focus {
      outline: none;
      box-shadow: none;
  }
  .password-container {
    position: relative;
  }
  .toggle-password {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    font-size: 0.875rem;
  }
</style>


<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<main class="h-screen">
  <div style="height: calc(100vh - 100px);" class="flex">
    <form class="container flex flex-col gap-4 max-w-[600px] my-auto mx-auto max-[600px]:mx-6">  
      <h2 class="text-center text-3xl mb-4">Dekut 2025 AGV Robotics</h2>
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
        externalClass="mt-4 w-full"
      >Log In</Button>  
    </form>
  </div>
</main>