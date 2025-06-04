<!--
use:enhance is a Svelte action that allows you to enhance forms with AJAX-like behavior.
It lets you run logic before and after the form submission, and it can be used to handle the response from the server.
############Important############
use enhance helps sveltkit to intercept form submission hence no page reload hence no need to use preventDefault
form submission is then handled by the server(+page.server.js) and the response is returned to the client.

After return,enhance calls eg handlesubmit(use:enhance={handleSubmit}) callback update
update() cause the page to rerun with the updated form prop(export let form)
-->

<!--
export let form;
SvelteKit automatically injects it into your page if you submit a form 
enhanced with use:enhance or just a normal HTML post to your page.
As a result you maye access:
- form.error: The error message returned from the server.
- form.data: The data returned from the server.
- form.status: The status code returned from the server.
- form.method: The method used to submit the form.
- form.success: A boolean indicating if the form submission was successful.
-->

<!--
Actions:
when a form submits, +page.server.js will be called. 
it will look for a matching actions hence execute.

export let form comes from the return of the action ################Important#########
-->
<script>
	import { enhance } from '$app/forms';
  import {Button} from '@sierra-95/svelte-ui';
  import { Eye, EyeOff } from '@lucide/svelte';
  import { page } from '$app/stores';
  
  let email = '';
  let password = '';
  let showPassword = false;
  let isLoading = false;
  let showCaptcha = true;

  function handleEnhance() {
    isLoading = true;
    // @ts-ignore
    return async ({ update, result }) => {
      isLoading = false;
      //This is the actual return value from your actions.default()
      //if (!result.success) showToast(result.error)
      await update(result);
    };
  }
  $: if ($page.form?.error) {
		// Hide and re-show the CAPTCHA to allow multiple submissions
		showCaptcha = false;
		setTimeout(() => {
			showCaptcha = true;
		}, 10);
	}
  
  
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
      use:enhance={handleEnhance}
      class="container flex flex-col gap-4 max-w-[600px] my-auto mx-auto max-[600px]:mx-6"
    >  
      <h2 class="text-center text-3xl mb-4">Dekut 2025 AGV Robotics</h2>

      {#if $page.form?.error}
        <div class="error text-red-500">{$page.form.error}</div>
      {/if}
      
      <!--Email-->
      <div class="w-full">
        <label for="email">Email</label>
        <input class="w-full" type="email" id="email" name="email" bind:value={email}/>
      </div>
      <!--Password-->
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
      <!--Turnstile-->
      {#if showCaptcha}
        <div
          class="cf-turnstile"
          data-sitekey="0x4AAAAAABdtnf8oh8_LBi9N"
          data-callback="onVerify"
          data-theme="light"
          data-size='flexible'
        ></div>
      {/if}
      <Button 
        color="primary" 
        submit={true}
        isLoading={isLoading}
        externalClass="mt-4 w-full"
      >Log In</Button>  
    </form>
  </div>
</main>