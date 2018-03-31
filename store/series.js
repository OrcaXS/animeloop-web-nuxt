// import Vue from 'vue';
import remote from '~/assets/js/api/fetch';
import validate from '~/assets/js/utils/validate';

const series = {
  state: {
    series: {/* [id: seriesid]: Series */},
    // seriesListByPage: {/* [page: pagenum]: seriesid */},
    seriesListByGroupFilter: [],
    seasons: {/* [year]: month */},
    seriesCount: 0,
    maxSeriesInPage: 30,
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

    SET_SERIES_COUNT: (state, { data }) => {
      state.seriesCount = data.count;
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
      if (!validate.obj(data)) throw new Error('Cannot fetch data');
      commit('SET_SERIES', { seriesid, data });
    },

    async fetchSeriesCount({ commit }, {
      type, season,
    }) {
      const { data } = await remote.getSeriesCount({
        type, season,
      });
      if (!validate.obj(data)) throw new Error('Cannot fetch data');
      commit('SET_SERIES_COUNT', { data });
    },

    async fetchSeriesGroup({ state, commit, dispatch }, {
      type, season, page, limit = state.maxSeriesInPage,
    }) {
      const { data } = await remote.getSeriesGroup({
        type, season, page, limit,
      });
      if (!validate.arr(data)) throw new Error('Cannot fetch data');
      commit('SET_SERIES_GROUP', { data });
      await dispatch('fillSeriesList', { data });
    },

    async fetchAllSeasons({ commit }) {
      const { data } = await remote.getAllSeasons;
      if (!validate.arr(data)) throw new Error('Cannot fetch data');
      commit('SET_SEASONS', { data });
    },
  },
};

export default series;
