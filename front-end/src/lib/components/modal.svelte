<!-- src/lib/components/Modal.svelte -->
<script>
  import { modalStore } from '$lib/stores/modal';
  import { onMount } from 'svelte';

  let modal;

  $: modalData = $modalStore;

  function close() {
    modalStore.update(m => ({ ...m, open: false }));
  }

  /**
	 * @param {{ key: string; }} e
	 */
  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if modalData.open}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 class="text-xl font-semibold mb-4">{modalData.title}</h2>
      <div class="mb-6">{modalData.content}</div>
      <div class="flex justify-end gap-2">
        {#if modalData.cancelText}
        <button on:click={() => {
            modalData.onCancel?.(); // optional chaining is fine here
            close();
        }}>
            {modalData.cancelText}
        </button>
        {/if}

        <button on:click={() => {
        modalData.onConfirm?.();
        close();
        }}>
        {modalData.confirmText}
        </button>

      </div>
    </div>
  </div>
{/if}
