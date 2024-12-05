import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      redirect: '/login'  // Redirect root path to /login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeWrapper.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Accounts.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
});

export default router;
