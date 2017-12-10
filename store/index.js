import Vue from 'vue';
import Vuex from 'vuex';
// import actions from './actions';
// import mutations from './mutations';
// import getters from './getters';
import loop from './loop';
import series from './series';
import episode from './episode';

Vue.use(Vuex);

const createStore = () => new Vuex.Store({
  state: {
  },
  modules: {
    loop,
    series,
    episode,
  },
  // actions,
  // mutations,
  // getters,
});

export default createStore;
