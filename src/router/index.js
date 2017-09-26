import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import Home from '@/components/pages/Home';
import AnimeList from '@/components/pages/AnimeList';
import Search from '@/components/pages/Search';
import AnimeLoopAPI from '@/components/pages/AnimeLoopAPI';
import About from '@/components/pages/About';
import Random from '@/components/pages/Random';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/list',
      name: 'List',
      component: AnimeList,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/API',
      name: 'AnimeLoopAPI',
      component: AnimeLoopAPI,
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
  ],
});
