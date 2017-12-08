import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const createStore = () => new Vuex.Store({
  state: {
    loopList: {},
    loops: {/* [id: loopid]: Loop */},
    episodes: {/* [id: episodeid]: Episode */},
    series: {/* [id: seriesid]: Series */},
  },
  actions,
  mutations,
  getters,
});

export default createStore;
