import remote from '~/api/fetch';

const series = {
  state: {
    series: {/* [id: seriesid]: Series */},
  },

  mutations: {
    SET_SERIES: (state, { seriesid, data }) => {
      state.series[seriesid] = data;
    },

  },

  getters: {

  },

  actions: {
    async fetchSeriesByID({ commit, state }, { seriesid }) {
      const { data } = await remote.getSeriesByID(seriesid);
      console.log(data);
      commit('SET_SERIES', { series, data });
    },

  },
};

export default series;
