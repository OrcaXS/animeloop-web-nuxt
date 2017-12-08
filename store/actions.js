import remote from '~/api/fetch';

export default {
  async fetchLoop({ commit, state }, { loopid }) {
    const { data } = await remote.getLoopByID(loopid);
    console.log(data);
    commit('SET_LOOP', { loopid, data });
  },

  async fetchRandomLoopList({ commit, state }, { count }) {
    const { data } = await remote.fetchRandomLoopList(count);
    console.log(data);
    commit('SET_LOOPLIST', { data });
  },
};
