import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/SettingsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/management',
    name: 'management',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManagementView.vue'),
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: {
      guest: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('auth') == null) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      let isAuth = localStorage.getItem('auth');
      let timestamp = localStorage.getItem('timestamp');
      if (to.matched.some(record => record.meta.is_admin)) {
        if (isAuth && new Date(timestamp > Date.now() - 3600000)) {
          // Check if user is admin
          if (localStorage.getItem('is_admin') == 'true') {
            next();
          } else {
            next({ name: 'Home' });
          }
        } else {
          localStorage.clear();
          next({ name: 'Home' });
        }
      } else {
        next();
      }
    }

  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('auth') == null) {
      next();
    } else {
      next({ name: 'Home' });
    }
  } else {
    next();
  }
});

export default router
