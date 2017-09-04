import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import Home from '@/components/Home';
import AnimeList from '@/components/AnimeList';
import Search from '@/components/Search';
import AnimeLoopAPI from '@/components/AnimeLoopAPI';
import About from '@/components/About';
import Random from '@/components/Random';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/random',
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
