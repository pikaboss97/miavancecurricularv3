<template>
  <div v-show="this.$store.state.layout === 'landing'" class="landing-bg h-100 bg-gradient-primary position-fixed w-100">
  </div>
  <sidenav :custom_class="this.$store.state.mcolor" :class="[
      this.$store.state.isTransparent,
      this.$store.state.isRTL ? 'fixed-end' : 'fixed-start'
    ]" v-if="this.$store.state.showSidenav" />
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">

    <!-- nav -->
    <navbar :class="[navClasses]" :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : 'text-white'
      " :minNav="navbarMinimize" v-if="this.$store.state.showNavbar" />

    <SlotSwipper v-if="this.$store.state.showSidenav" :slides="slotSlides" />
    <router-view />

    <app-footer v-show="this.$store.state.showFooter" />
    <configurator :toggle="toggleConfigurator" :class="[
        this.$store.state.showConfig ? 'show' : '',
        this.$store.state.hideConfigButton ? 'd-none' : ''
      ]" />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import SlotSwipper from "./components/SlotSwipper.vue"
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";

const slotSlides=[
  {id:"casino_slots",url: require('@/assets/img/banner.png') },
  {id:'spaceman', url:`https://d2zzz5z45zl95g.cloudfront.net/casino/images/banner/bannerv19.png`},
  {id:'aviator', url:`https://d2zzz5z45zl95g.cloudfront.net/casino/images/banner/bannerv18.png`},
  {id:"peaky_blinder",url:`https://d2zzz5z45zl95g.cloudfront.net/casino/images/banner/bannerv17.png`},
  {id:"casino_slots",url:`https://d2zzz5z45zl95g.cloudfront.net/casino/images/banner/bannerv1.png`},
];

export default {
  name: "App",
  components: {
    Sidenav,
    SlotSwipper,
    Configurator,
    Navbar,
    AppFooter
  },
  data(){
    return{
      slotSlides
    }
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"])
  },
  computed: {
    navClasses() {
      return {
        "position-sticky bg-white left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && !this.$store.state.darkMode,
        "position-sticky bg-default left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && this.$store.state.darkMode,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4": !this.$store.state.isAbsolute
      };
    }
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";

  }
};
</script>
