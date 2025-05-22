<script lang="ts">
  import { onMount } from 'svelte';
  import { user,Header, SideMenu, SideBar,LinearProgress, isLoading, SiteUnderMaintenance, Toast, Modal } from '$lib';
  import Swiper, { Swiper as SwiperClass } from 'swiper';
  import { page } from '$app/stores';

  //Loading User data
  export let data;
  onMount(() => {
    user.set(data.user.user);
  });
  //######################
  let swiper: SwiperClass;

  //Close Menu after navigating on phones
  $: currentPath = $page.url.pathname;
  const isMobile = () => window.innerWidth < 768;

  $: if (swiper && currentPath && isMobile()) {
    swiper.slideTo(1);
  }

  //Initialize Swiper
  onMount(() => {
    const menuButton = document.querySelector('.menu-button');
    const openMenu = () => swiper.slidePrev();

    swiper = new Swiper('.swiper', {
      slidesPerView: 'auto',
      initialSlide: 1,
      resistanceRatio: 0,
      slideToClickedSlide: true,
      // allowTouchMove: false,
      on: {
        slideChangeTransitionStart(this: SwiperClass) {
          const slider = this;
          const sidebar = document.getElementById('sidebar');
          const children = document.getElementById('children');
          if (slider.activeIndex === 0) {
            menuButton?.classList.add('cross');
            if (sidebar) sidebar.style.display = 'none';
            if (children) children.style.width = '100%';
            menuButton?.removeEventListener('click', openMenu, true);
          } else {
            menuButton?.classList.remove('cross');
            if (sidebar) sidebar.style.display = '';
            if (children) children.style.width = 'calc(100% - 100px)';
          }
        },
        slideChangeTransitionEnd(this: SwiperClass) {
          const slider = this;
          if (slider.activeIndex === 1) {
            menuButton?.addEventListener('click', openMenu, true);
          }
        },
      },
    });
  });
</script>

<style>
  @import './layout.css';
  main{
    height: calc(100vh - 70px);
  }
</style>
<div class="swiper">
  <div class="swiper-wrapper">
    <SideMenu/>
    <div class="swiper-slide">
      <Header />
      <main class="flex">
        <SideBar/>
        <div id="children" class="flex-grow">
          {#if $isLoading}
            <LinearProgress />
          {/if}
          <!-- <SiteUnderMaintenance/> -->
          <Toast/>
          <Modal/>
          <slot/>
        </div>
      </main>
    </div>
  </div>
</div>
