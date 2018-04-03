import Vue from 'vue';
import remote from '~/assets/js/api/fetch';
import validate from '~/assets/js/utils/validate';

const episode = {
  state: {
    episodes: {/* [id: episodeid]: Episode */},
    episodeList: {/* [id: seriesid]: Episode */},
  },

  mutations: {
    SET_EPISODE: (state, { episodeid, data }) => {
      state.episodes[episodeid] = data;
    },

    SET_EPISODES_BY_SERIES: (state, { seriesid, data }) => {
      data.sort((prev, next) => {
        function isStringNaN(str) {
          return Number.isNaN(parseInt(str, 10));
        }
        if (isStringNaN(prev.no) && isStringNaN(next.no)) return 0;
        else if (isStringNaN(prev.no) && !isStringNaN(next.no)) return 1;
        else if (!isStringNaN(prev.no) && isStringNaN(next.no)) return -1;
        return (parseInt(prev.no, 10) - parseInt(next.no, 10));
      });
      Vue.set(state.episodeList, seriesid, data);
    },
  },

  getters: {

  },

  actions: {
    async fetchEpisodeByID({ dispatch, commit }, { episodeid }) {
      const { data } = await remote.getEpisodeByID(episodeid);
      if (!validate.obj(data)) throw new Error('Cannot fetch data');
      await dispatch('setSeriesByID', { seriesid: data.series.id, data: data.series });
      commit('SET_EPISODE', { episodeid, data });
    },

    async setSeriesByID({ commit }, { seriesid, data }) {
      commit('SET_SERIES', { seriesid, data });
    },

    async fetchEpisodesBySeriesID({ commit }, { seriesid }) {
      const { data } = await remote.getEpisodesBySeriesID(seriesid);
      if (!validate.arr(data)) throw new Error('Cannot fetch data');
      commit('SET_EPISODES_BY_SERIES', { seriesid, data });
    },

  },
};

export default episode;
