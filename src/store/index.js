import Vue from 'vue';
import Vuex from 'vuex';
import fetchRandom from './fetchRandom';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    img: true,
  },
  modules: {
    fetchRandom,
  },
});
