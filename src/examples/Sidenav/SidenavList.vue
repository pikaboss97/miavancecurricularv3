<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item" @click="closeMenu()">
        <sidenav-item url="/dashboard" :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Dashboard'">
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" @click="closeMenu()">
        <sidenav-item url="/matriculados" :class="getRoute() === 'record-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Cursos Matriculados'">
          <template v-slot:icon>
            <i class="ni ni-books text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" @click="closeMenu()">
        <sidenav-item url="/record" :class="getRoute() === 'record-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Record'">
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <!--  <li class="nav-item">
        <sidenav-item
          url="/tables"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : 'Tables'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/billing"
          :class="getRoute() === 'billing' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Billing'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/virtual-reality"
          :class="getRoute() === 'virtual-reality' ? 'active' : ''"
          :navText="
            this.$store.state.isRTL ? 'الواقع الافتراضي' : 'Virtual Reality'
          "
        >
          <template v-slot:icon>
            <i class="ni ni-app text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
      <li class="mt-3 nav-item">
        <h6 v-if="this.$store.state.isRTL" class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'">
          صفحات المرافق
        </h6>
        <h6 v-else class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'">
          ACCOUNT PAGES
        </h6>
      </li>
      <li class="nav-item" @click="closeMenu()">
        <sidenav-item url="/profile" :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Profile'">
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <!--       <li class="nav-item">
        <sidenav-item
          url="/signin"
          :class="getRoute() === 'signin' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'تسجيل الدخول' : 'Sign In'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/signup"
          :class="getRoute() === 'signup' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'اشتراك' : 'Sign Up'"
        >
          <template v-slot:icon>
            <i class="ni ni-collection text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
      <li v-if="isMobile()" class="nav-item mt-5">
        <div class="mb-3 text-center" style="cursor:pointer;" @click="closeMenu()">
          <i class="ni ni-bold-left text-dark text-sm opacity-10"
            style="background-color: green; height: 30px; width: 30px; border-radius: 50%;"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Miavancecurricular",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    closeMenu() {
      let app = document.getElementById("app");
      app.classList.replace("g-sidenav-pinned", "g-sidenav-hiden")
    },
    isMobile() {
      let mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      console.log(mobile);
      return mobile;
    }

  }
};
</script>
