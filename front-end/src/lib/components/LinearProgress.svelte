<script lang="ts">
    export let color = '#3b82f6';
    export let trackColor = '#e5e7eb';
    export let height = '6px';
    export let width = '100%';
    export let speed = 3;
    export let indeterminate = true; // toggle between indeterminate and determinate mode
    export let value = 0; // only used in determinate mode (0-100)
  
    // Determinate mode
    $: determinateStyle = `
      width: ${value}%;
      background-color: ${color};
      transition: width 0.3s ease-out;
    `;
  </script>
  
  <style>
    .progress-container {
      position: relative;
      width: var(--width);
      height: var(--height);
      background-color: var(--track-color);
      overflow: hidden;
    }
  
    .progress-bar {
      position: absolute;
      height: 100%;
    }
  
    /* Indeterminate animation */
    .indeterminate {
      width: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--color) 50%,
        transparent 100%
      );
      background-size: 200% 100%;
      animation: indeterminate-animation var(--speed) infinite linear;
    }
  
    @keyframes indeterminate-animation {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  
    /* Buffer effect for indeterminate */
    .buffer-effect {
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0.3;
      background: linear-gradient(
        to right,
        transparent 0%,
        var(--color) 50%,
        transparent 100%
      );
      background-size: 200% 100%;
      animation: buffer-animation calc(var(--speed) * 1.5) infinite linear;
    }
  
    @keyframes buffer-animation {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  </style>
  
  <div
    class="progress-container"
    style="
      --width: {width};
      --height: {height};
      --track-color: {trackColor};
      --color: {color};
      --speed: {speed}s;
    "
  >
    {#if indeterminate}
      <div class="progress-bar indeterminate"></div>
      <div class="buffer-effect"></div>
    {:else}
      <div class="progress-bar" style={determinateStyle}></div>
    {/if}
  </div>