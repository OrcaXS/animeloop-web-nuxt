import remote from '~/api/fetch';

const series = {
  state: {
    series: {/* [id: seriesid]: Series */},
    seriesList: {},
  },

  mutations: {
    SET_MULTIPLE_SERIES: (state, { data }) => {
      data.forEach((val) => {
        state.series[val.id] = val;
      });
    },

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
      commit('SET_SERIES', { seriesid, data });
    },

  },
};

export default series;
