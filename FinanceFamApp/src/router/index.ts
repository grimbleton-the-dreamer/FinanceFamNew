import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/login'),
  routes: [
    {
      path: '/',
      redirect: '/login'  // Redirect root path to /login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Accounts.vue')
    },
    {
      path: '/household',
      name: 'household',
      component: () => import('../views/Household.vue')
    },
    {
      path: '/finances',
      name: 'finances',
      component: () => import('../views/AssetsExpenses.vue')
    },
    {
      path: '/admintools',
      name: 'admintools',
      component: () => import('../views/AdminTools.vue')
    },
  ]
});

export default router;
