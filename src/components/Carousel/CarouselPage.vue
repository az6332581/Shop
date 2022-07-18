<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="list in lists" :key="list.id">
        <img :src="list.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "CarouselPage",
  props: ["lists"],
  watch: {
    lists: {
      immediate:true,
      handler() {
        this.$nextTick(() => {
          const swiper = new Swiper(this.$refs.mySwiper, {
            // direction: 'vertical',
            loop: true,
            centeredSlides: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // 允许分页点击跳转
            },
            // 自动轮播
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
            },
            //导航小点
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>
