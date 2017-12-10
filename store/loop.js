import remote from '~/api/fetch';

const loop = {
  state: {
    loopList: {},
    loops: {/* [id: loopid]: Loop */},
  },

  mutations: {
    SET_LOOP: (state, { loopid, data }) => {
      state.loops[loopid] = data;
    },

    SET_LOOPLIST: (state, { data }) => {
      state.loopList = data;
    },

  },

  getters: {

  },

  actions: {
    async fetchLoopByID({ commit, state }, { loopid }) {
      const { data } = await remote.getLoopByID(loopid);
      console.log(data);
      commit('SET_LOOP', { loopid, data });
    },
    async fetchRandomLoopList({ commit, state }, { count }) {
      const { data } = await remote.fetchRandomLoopList(count);
      console.log(data);
      commit('SET_LOOPLIST', { data });
    },
  },
};

export default loop;
