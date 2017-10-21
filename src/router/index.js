import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
// import Hello from '@/components/Hello';
import Home from '@/components/pages/Home';
import APIStatus from '@/components/pages/APIStatus';
import Search from '@/components/pages/Search';
// import AnimeLoopAPI from '@/components/pages/AnimeLoopAPI';
import About from '@/components/pages/About';
import Random from '@/components/pages/Random';
import LoopPage from '@/components/pages/LoopPage';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/api_status',
      name: 'API_Status',
      component: APIStatus,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/random',
      name: 'Random',
      component: Random,
    },
    {
      path: '/loop/:id',
      name: 'LoopPage',
      component: LoopPage,
      props: true,
    },
  ],
  linkActiveClass: 'is-active',
});
