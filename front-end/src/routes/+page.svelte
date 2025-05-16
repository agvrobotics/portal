<script>
  import {Button, Header} from '$lib'
  let email = '';
  let password = '';
  let showPassword = false;

  const handleLogin = () => {
    alert("Logging in");
  };
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
      color: #4C60FF;
      cursor: pointer;
      font-size: 0.875rem;
    }
  </style>
<main class="h-screen">
  <Header/>
  <div style="height: calc(100vh - 100px);" class="flex">
    <form class="container flex flex-col gap-4 max-w-[600px] my-auto mx-auto max-[600px]:mx-6">  
      <h2 class="text-center text-3xl mb-4">Dekut AGV Robotics</h2>
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
          <button class="toggle-password" on:click={() => showPassword = !showPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>  
      <Button 
        color="primary" 
        onClick={handleLogin} 
        externalClass="mt-4 w-full"
      >Log In</Button>  
    </form>
  </div>
</main>