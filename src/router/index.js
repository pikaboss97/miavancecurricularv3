import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Record from "../views/Record.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: Dashboard,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  },
  {
    path: "/record",
    name: "Record",
    component: Record,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  // Catch-all route for non-existing routes
  {
    path: '/:catchAll(.*)',
    component: Profile,
    meta: {
      requiresAuth: true // esta ruta requiere autenticación
    }
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) {
    next('/signin');
  } else {
    next();
  }
});
export default router;
