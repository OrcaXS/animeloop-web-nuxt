import Vue from 'vue';
import remote from '~/assets/js/api/fetch';

const series = {
  state: {
    series: {/* [id: seriesid]: Series */},
    seriesListByPage: {/* [page: pagenum]: seriesid */},
    seriesPageCount: 0,
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

    SET_SERIES_PAGE_COUNT: (state, { data }) => {
      state.seriesPageCount = data;
    },

    SET_SERIES_BY_PAGE_NUM: (state, { data, pageNum }) => {
      state.seriesListByPage[pageNum] = [];
      data.forEach((val) => {
        state.seriesListByPage[pageNum].push(val.id);
      });
    },

  },

  getters: {

  },

  actions: {
    async fetchSeriesByID({ commit }, { seriesid }) {
      const { data } = await remote.getSeriesByID(seriesid);
      console.log(data);
      commit('SET_SERIES', { seriesid, data });
    },

    async fetchSeriesPageCount({ commit }) {
      const { data } = await remote.getSeriesPageCount;
      commit('SET_SERIES_PAGE_COUNT', { data });
    },

    async fetchSeriesByPageNum({ commit, dispatch }, { pageNum }) {
      const { data } = await remote.getSeriesByPageNum(pageNum);
      // console.log(data);
      // console.log(pageNum);
      commit('SET_SERIES_BY_PAGE_NUM', { data, pageNum });
      await dispatch('fillSeriesList', { data });
    },
  },
};

export default series;
