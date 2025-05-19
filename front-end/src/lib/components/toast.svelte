<script>
  import { toasts, ToastContainer, FlatToast, BootstrapToast }  from "svelte-toasts";

  const showToast = () => {
    const toast = toasts.add({
      title: 'Message title',
      description: 'Message body',
      duration: 10000, // 0 or negative to avoid auto-remove
      placement: 'bottom-right',
      type: 'info',
      theme: 'dark',
      onClick: () => {},
      onRemove: () => {},
      // component: BootstrapToast, // allows to override toast component/template per toast
    });

    // toast.remove()

  };
</script>

<main class="flex flex-col container items-center mt-10">
	<h1 class="text-lg block text-center">Svelte Toasts</h1>
  <button on:click={showToast}>Show Toast</button>
  <ToastContainer placement="bottom-right" let:data={data}>
    <FlatToast {data} /> <!-- Provider template for your toasts -->
  </ToastContainer>
</main>