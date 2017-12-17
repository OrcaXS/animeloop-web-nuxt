import Vue from 'vue';
import remote from '~/api/fetch';

function tidyTimestamp(time) {
  const arr = time.split(':');
  if (arr[0] !== '00') {
    arr[1] = (parseInt(arr[0], 10) * 60) + parseInt(arr[1], 10);
    arr[1] = arr[1].toString();
  }
  arr[2] = arr[2].includes('.') ? arr[2].slice(0, -3) : `${arr[2]}.000`;
  return `${arr[1]}:${arr[2]}`;
}

const loop = {
  state: {
    randomLoopList: [/* Loopid */],
    loopList: {/* [id: episodeid]: Loopid */},
    loops: {/* [id: loopid]: Loop */},
  },

  mutations: {
    SET_LOOP: (state, { loopid, data }) => {
      state.loops[loopid] = data;
    },

    // SET_LOOPS: (state, { loopid, data }) => {
    //   state.loops[];
    // }

    SET_LOOPLIST: (state, { episodeid, data }) => {
      Vue.set(state.loopList, episodeid, data);
    },

    SET_RANDOM_LOOPLIST: (state, { data }) => {
      state.randomLoopList = data;
    },

  },

  getters: {
    formatTimeStamps: state => loopid => ({
      duration: state.loops[loopid].duration.toFixed(3),
      begin: `${tidyTimestamp(state.loops[loopid].period.begin)}`,
      end: `${tidyTimestamp(state.loops[loopid].period.end)}`,
    }),
  },

  actions: {
    async fetchLoopByID({ commit, state }, { loopid }) {
      const { data } = await remote.getLoopByID(loopid);
      console.log(data);
      commit('SET_LOOP', { loopid, data });
    },

    async fetchRandomLoopList({ commit, state }, { count }) {
      const { data } = await remote.getRandomLoopList(count);
      console.log(data);
      commit('SET_RANDOM_LOOPLIST', { data });
    },

    async fetchLoopsByEpisodeID({ commit, state }, { episodeid }) {
      const { data } = await remote.getLoopsByEpisodeID(episodeid);
      commit('SET_LOOPLIST', { episodeid, data });
      data.forEach((val) => {
        commit('SET_LOOP', { loopid: val.id, data: val });
      });
    },
  },
};

export default loop;
