import Vue from 'vue';
import Vuex from 'vuex';
import fetchRandom from './fetchRandom';
import fetchHome from './fetchHome';
import fetchLoop from './fetchLoop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    img: true,
  },
  modules: {
    fetchRandom,
    fetchHome,
    fetchLoop,
  },
});
