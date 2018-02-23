// import Vue from 'vue';
import remote from '~/assets/js/api/fetch';

const series = {
  state: {
    series: {/* [id: seriesid]: Series */},
    // seriesListByPage: {/* [page: pagenum]: seriesid */},
    seriesListByGroupFilter: [],
    seasons: {/* [year]: month */},
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

    SET_SERIES_GROUP: (state, { data }) => {
      state.seriesListByGroupFilter = data;
    },

    SET_SEASONS: (state, { data }) => {
      state.seasons = {};
      [...new Set(data)].forEach((val) => {
        const year = val.split('-')[0];
        const month = val.split('-')[1];
        const seasonHasYear = Object.prototype.hasOwnProperty.call(state.seasons, year);
        if (!seasonHasYear) {
          state.seasons[year] = [];
        }
        state.seasons[year].push(month);
      });
    },

  },

  actions: {
    async fetchSeriesByID({ commit }, { seriesid }) {
      const { data } = await remote.getSeriesByID(seriesid);
      if (!data) throw new Error('Cannot fetch data');
      commit('SET_SERIES', { seriesid, data });
    },

    async fetchSeriesPageCount({ commit }) {
      const { data } = await remote.getSeriesPageCount;
      if (!data) throw new Error('Cannot fetch data');
      commit('SET_SERIES_PAGE_COUNT', { data });
    },

    // async fetchSeriesByPageNum({ commit, dispatch }, { pageNum }) {
    //   const { data } = await remote.getSeriesByPageNum(pageNum);
    //   if (!data) throw new Error('Cannot fetch data');
    //   commit('SET_SERIES_BY_PAGE_NUM', { data, pageNum });
    //   await dispatch('fillSeriesList', { data });
    // },

    async fetchSeriesGroup({ commit, dispatch }, {
      type, season, page, limit = 50,
    }) {
      const { data } = await remote.getSeriesGroup({
        type, season, page, limit,
      });
      if (!data) throw new Error('Cannot fetch data');
      commit('SET_SERIES_GROUP', { data });
      await dispatch('fillSeriesList', { data });
    },

    async fetchAllSeasons({ commit }) {
      const { data } = await remote.getAllSeasons;
      if (!data) throw new Error('Cannot fetch data');
      commit('SET_SEASONS', { data });
    },
  },
};

export default series;
