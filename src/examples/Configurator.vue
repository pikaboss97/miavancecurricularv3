<template>
  <div class="fixed-plugin">
    <a class="px-3 py-2 fixed-plugin-button text-dark position-fixed" @click="toggle">
      <i class="py-2 fa fa-cog"></i>
    </a>
    <div class="shadow-lg card">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="" :class="this.$store.state.isRTL ? 'float-end' : 'float-start'">
          <h5 class="mt-3 mb-0">Configuraciones</h5>
        </div>
        <div class="mt-4" @click="toggle" :class="this.$store.state.isRTL ? 'float-start' : 'float-end'">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 card-body pt-sm-3">
        <!-- Sidebar Backgrounds -->
        <div>
          <h6 class="mb-0">Items activos del menu</h6>
        </div>
        <a href="#" class="switch-trigger background-color">
          <div class="my-2 badge-colors" :class="this.$store.state.isRTL ? 'text-end' : ' text-start'">
            <span class="badge filter bg-gradient-primary active" data-color="primary"
              @click="sidebarColor('primary')"></span>
            <span class="badge filter bg-gradient-dark" data-color="dark" @click="sidebarColor('dark')"></span>
            <span class="badge filter bg-gradient-info" data-color="info" @click="sidebarColor('info')"></span>
            <span class="badge filter bg-gradient-success" data-color="success" @click="sidebarColor('success')"></span>
            <span class="badge filter bg-gradient-warning" data-color="warning" @click="sidebarColor('warning')"></span>
            <span class="badge filter bg-gradient-danger" data-color="danger" @click="sidebarColor('danger')"></span>
          </div>
        </a>
        <!-- Sidenav Type -->
        <div class="mt-3">
          <h6 class="mb-0">Temas</h6>
        </div>
        <hr class="horizontal dark my-2" />
        <div class="mt-1 mb-5 d-flex">
          <h6 class="mb-0" :class="this.$store.state.isRTL ? 'ms-2' : ''">
            Light / Dark
          </h6>
          <div class="form-check form-switch ps-0 ms-auto my-auto">
            <input class="form-check-input mt-1 ms-auto" type="checkbox" :checked="this.$store.state.darkMode"
              @click="setDarkMode" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { activateDarkMode, deactivateDarkMode } from "@/assets/js/dark-mode";
export default {
  name: "configurator",
  props: ["toggle"],
  methods: {
    ...mapMutations(["navbarMinimize", "sidebarType", "navbarFixed"]),
    sidebarColor(color = "success") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      this.$store.state.mcolor = `card-background-mask-${color}`;
    },
    sidebarType(type) {
      this.$store.state.sidebarType = type;
    },
    setNavbarFixed() {
      if (
        this.$route.name !== "Profile" ||
        this.$route.name !== "All Projects"
      ) {
        this.$store.state.isNavFixed = !this.$store.state.isNavFixed;
      }
    },
    setDarkMode() {
      if (this.$store.state.darkMode) {
        this.$store.state.darkMode = false;
        this.$store.state.sidebarType = "bg-white";
        this.sidebarColor('success');
        deactivateDarkMode();
        return;
      } else {
        this.$store.state.darkMode = true;
        this.$store.state.sidebarType = "bg-default";
        this.sidebarColor('primary');
        activateDarkMode();
      }
    },
    sidenavTypeOnResize() {
      let white = document.querySelector("#btn-white");
      if (window.innerWidth < 1200) {
        white.classList.add("disabled");
      } else {
        white.classList.remove("disabled");
      }
    }
  },
  computed: {
    sidenavResponsive() {
      return this.sidenavTypeOnResize;
    }
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    this.setDarkMode();
    //window.addEventListener("resize", this.sidenavTypeOnResize);
    //window.addEventListener("load", this.sidenavTypeOnResize);
  }
};
</script>
