import Vue from 'vue';
import Vuex from 'vuex';
import fetchRandom from './fetchRandom';
import fetchHome from './fetchHome';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    img: true,
  },
  modules: {
    fetchRandom,
    fetchHome,
  },
});
