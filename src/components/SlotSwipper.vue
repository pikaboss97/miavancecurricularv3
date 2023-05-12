<template>
  <swiper :slides-per-view="slidesPerView_" :space-between="spaceBetween_" :slidesPerGroup="slidesPerGroup_" :loop="loop_"
    :loopFillGroupWithBlank="loopFillGroupWithBlank_" :modules="modules" :navigation="navigation_" :autoplay="autoPlay_" :transition="3000" effect="slide">
    <swiper-slide :style="showNames ? 'height:130px;' : ''" :class="showNames ? 'swipper-slide-prop' : ''"
      v-for="slide in slides" :key="slide.id">
      <div>
        <img :style="showNames ? 'margin-bottom: 15px;' : ''" class="slider-img-class" @click="click(slide.id)"
          :src="slide.url" />
        <span style="padding: 0.5rem 0;" v-if="showNames">{{ slide.id }}</span>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
import { EffectFade } from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';

//import 'swiper/css';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss';


export default {
  props: ["slides", "onClick", 'slidesPerView', 'autoPlay', 'navigation', 'spaceBetween', 'showNames', 'slidesPerGroup', 'loop', 'loopFillGroupWithBlank', 'lang'],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slidesPerView_: 1,
      autoPlay_: { delay: 5000, disableoninteraction: true, },
      navigation_: true,
      spaceBetween_: 10,
      slidesPerGroup_: 1,
      loop_: true,
      loopFillGroupWithBlank_: false
    }
  },
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay, EffectFade],
      
    };
  },
  methods: {
    click(slide_id) {
      this.onClick(slide_id);
    }
  },
  mounted() {
    if (this.slidesPerView != null) this.slidesPerView_ = this.slidesPerView
    if (this.autoPlay != null) this.autoPlay_ = this.autoPlay
    if (this.navigation != null) this.navigation_ = this.navigation
    if (this.spaceBetween != null) this.spaceBetween_ = this.spaceBetween
    if (this.slidesPerGroup != null) this.slidesPerGroup_ = this.slidesPerGroup
    if (this.loop != null) this.loop_ = this.loop
    if (this.loopFillGroupWithBlank != null) this.loopFillGroupWithBlank_ = this.loopFillGroupWithBlank

  }
};
</script>
<style scoped> * {
   color: white;
 }

 .slider-img-class {
   max-width: 100%;
   height: auto;
   display: block;

 }

 .swiper {
   border-radius: 20px;
   margin-right: 15px;
 }

 .swipper-slide-prop {
   text-align: center;
   font-size: 18px;
   display: flex;
   justify-content: center !important;
   align-items: center;
   cursor: pointer;

 }

 .swipper-slide-prop:hover {
   background-color: rgba(192, 192, 192, 0.227);
 }

 @media (max-width: 768px) {
   .swiper {
     border-radius: 10px;
     margin: 2px 2px 0;
     height: 20vh;
   }

   .slider-img-class {
     max-width: 100%;
     height: auto;
     display: block;
     height: 20vh;
   }

 }</style>