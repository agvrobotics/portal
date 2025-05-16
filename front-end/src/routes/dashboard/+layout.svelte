<script>
	import './layout.css';
  import {Header, SideMenu,SideBar} from '$lib'
	let { children } = $props();
</script>
<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
</svelte:head>

<div class="swiper">
	<div class="swiper-wrapper">
		<SideMenu/>
		<div class="swiper-slide">
      <Header/>
      <main class="h-full flex">
          <SideBar/>
          <div id='children' class="bg-amber-300">
            {@render children()}
          </div>
     </main>
		</div>
	</div>
</div>

<body>
  <!-- Swiper JS -->
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

  <!-- Initialize Swiper -->
  <script>
    var menuButton = document.querySelector('.menu-button');
    var openMenu = function () {
      swiper.slidePrev();
    };
    var swiper = new Swiper('.swiper', {
      slidesPerView: 'auto',
      initialSlide: 1,
      resistanceRatio: 0,
      slideToClickedSlide: true,
      on: {
        slideChangeTransitionStart: function () {
          var slider = this;
          const sidebar = document.getElementById('sidebar');
          const children = document.getElementById('children');
          if (slider.activeIndex === 0) {
            menuButton.classList.add('cross');
            if (sidebar) sidebar.style.display = 'none';
            if (children) {
              children.style.width = '100%';
            }
            // required because of slideToClickedSlide
            menuButton.removeEventListener('click', openMenu, true);
          } else {
            menuButton.classList.remove('cross');
            if (sidebar) sidebar.style.display = '';
            if (children) {
              children.style.width = 'calc(100% - 100px)';
            }
          }
        },
        slideChangeTransitionEnd: function () {
          var slider = this;
          if (slider.activeIndex === 1) {
            menuButton.addEventListener('click', openMenu, true);
          }
        },
      },
    });
  </script>
</body>
