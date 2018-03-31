import Vue from 'vue';
import remote from '~/assets/js/api/fetch';
import validate from '~/assets/js/utils/validate';

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
    randomLoopList: [/* loopid */],
    randomPageLoopid: '',
    loopList: {/* [id: episodeid]: loopid */},
    loops: {/* [id: loopid]: Loop */},
    play: false,
  },

  mutations: {
    SET_LOOP: (state, { loopid, data }) => {
      state.loops[loopid] = data;
    },

    SET_LOOPS: (state, { data }) => {
      data.forEach((val) => {
        Vue.set(state.loops, val.id, val);
      });
    },

    SET_LOOPLIST: (state, { episodeid, data }) => {
      Vue.set(state.loopList, episodeid, data);
    },

    SET_RANDOM_PAGE_LOOP_ID: (state, { data }) => {
      state.randomPageLoopid = data[0].id;
    },

    SET_RANDOM_LOOPLIST: (state, { data }) => {
      state.randomLoopList = [];
      data.forEach((val) => {
        state.randomLoopList.push(val.id);
      });
    },

    SET_PLAY: (state, { play }) => {
      state.play = play;
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
    async fetchLoopByID({ commit }, { loopid }) {
      const { data } = await remote.getLoopByID(loopid);
      if (!validate.obj(data)) throw new Error('Cannot fetch data');
      commit('SET_LOOP', { loopid, data });
    },

    async fetchRandomLoop({ dispatch, commit }) {
      const { data } = await remote.getRandomLoopList(1);
      if (!validate.arr(data)) throw new Error('Cannot fetch data');
      commit('SET_RANDOM_PAGE_LOOP_ID', { data });
      await dispatch('setLoops', { data });
    },

    async fetchRandomLoopList({ dispatch, commit }, { count }) {
      const { data } = await remote.getRandomLoopList(count);
      if (!validate.arr(data)) throw new Error('Cannot fetch data');
      commit('SET_RANDOM_LOOPLIST', { data });
      await dispatch('setLoops', { data });
    },

    async fetchLoopsByEpisodeID({ dispatch, commit }, { episodeid }) {
      const { data } = await remote.getLoopsByEpisodeID(episodeid);
      if (!validate.arr(data)) throw new Error('Cannot fetch data');
      commit('SET_LOOPLIST', { episodeid, data });
      await dispatch('setLoops', { data });
    },

    setLoops({ commit }, { data }) {
      commit('SET_LOOPS', { data });
    },

    setPlay({ commit }, { play }) {
      commit('SET_PLAY', { play });
    },
  },
};

export default loop;
