<script>
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  // User data - replace with your actual user data
  let user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3' // placeholder image
  };
  
  // Menu items
  const menuItems = [
    { label: 'Settings', icon: '⚙️' },
    { label: 'Profile', icon: '👤' },
    { label: 'Logout', icon: '🚪' }
  ];
  
  let anchorEl = null;
  let open = false;
  
  const handleClick = (/** @type {{ currentTarget: any; }} */ event) => {
    anchorEl = event.currentTarget;
    open = true;
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
  .user-menu {
    position: relative;
    display: inline-block;
  }
  
  .avatar-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    overflow: hidden;
    transition: transform 0.2s ease;
  }
  
  .avatar-button:hover {
    transform: scale(1.05);
  }
  
  .avatar-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
  
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .menu-paper {
    position: absolute;
    right: 0;
    top: 50px;
    min-width: 200px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow: hidden;
  }
  
  .user-info {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .user-name {
    font-weight: 600;
    font-size: 0.95rem;
    margin: 0 0 4px 0;
  }
  
  .user-email {
    font-size: 0.8rem;
    color: #666;
    margin: 0;
  }
  
  .menu-list {
    list-style: none;
    padding: 8px 0;
    margin: 0;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .menu-item:hover {
    background-color: #f5f5f5;
  }
  
  .menu-icon {
    margin-right: 12px;
    font-size: 1.1rem;
  }
  
  .menu-label {
    font-size: 0.9rem;
  }
</style>

<div class="user-menu">
  <button class="avatar-button" on:click={handleClick}>
    <img class="avatar-img" src={user.avatar} alt="User avatar" />
  </button>
  
  {#if open}
    <div class="menu-backdrop" role="none" on:click|self={handleClose} transition:fade={{ duration: 150 }}>
      <div class="menu-paper" transition:fly={{ y: -10, duration: 200, easing: quintOut }}>
        <div class="user-info">
          <p class="user-name">{user.name}</p>
          <p class="user-email">{user.email}</p>
        </div>
        
        <ul class="menu-list">
          {#each menuItems as item}
            <li role="none" class="menu-item" on:click={() => handleMenuItemClick(item.label)}>
              <span class="menu-icon">{item.icon}</span>
              <span class="menu-label">{item.label}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>