/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Classification from '@/views/Classification.vue';
import Shopping from '@/views/Shopping.vue';
import My from '@/views/My.vue';
import Search from '@/views/Search.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};

Vue.use(VueRouter);

const routes = [{
  path: '/home',
  component: Home,
  name: 'Home',
  children: [{
    path: 'classification',
    component: Classification,
    name: 'Classification',
  },
  {
    path: 'shopping',
    component: Shopping,
    name: 'Shopping',
  },
  {
    path: 'my',
    component: My,
    name: 'My',
  },
  ],
}, {
  path: '/search',
  component: Search,
  name: 'Search',
}, { path: '*', redirect: '/home' }];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
