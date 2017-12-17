import Vue from 'vue';
import remote from '~/api/fetch';

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
      Vue.set(state.episodeList, seriesid, data);
    },
  },

  getters: {

  },

  actions: {
    async fetchEpisodeByID({ dispatch, commit, state }, { episodeid }) {
      const { data } = await remote.getEpisodeByID(episodeid);
      await dispatch('setSeriesByID', { seriesid: data.series.id, data: data.series });
      commit('SET_EPISODE', { episodeid, data });
    },

    async setSeriesByID({ commit, state }, { seriesid, data }) {
      commit('SET_SERIES', { seriesid, data });
    },

    async fetchEpisodesBySeriesID({ commit, state }, { seriesid }) {
      const { data } = await remote.getEpisodesBySeriesID(seriesid);
      commit('SET_EPISODES_BY_SERIES', { seriesid, data });
    },

  },
};

export default episode;
