import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Budget from '@/views/Budgets.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Budget',
    component: Budget,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
