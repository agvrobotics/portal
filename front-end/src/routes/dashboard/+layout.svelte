<script lang="ts">
  import { onMount } from 'svelte';
  import { Header, SideMenu, SideBar } from '$lib';
  import Swiper, { Swiper as SwiperClass } from 'swiper';
  import { page } from '$app/stores';

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


<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
    defer
  ></script>
</svelte:head>

<style>
  @import './layout.css';
</style>
<div class="swiper">
  <div class="swiper-wrapper">
    <SideMenu/>
    <div class="swiper-slide">
      <Header />
      <main class="h-full flex">
        <SideBar/>
        <div id="children" class="flex-grow">
          <slot/>
        </div>
      </main>
    </div>
  </div>
</div>
