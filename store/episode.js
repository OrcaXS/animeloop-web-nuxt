import Vue from 'vue';
import remote from '~/assets/js/api/fetch';

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
    async fetchEpisodeByID({ dispatch, commit }, { episodeid }) {
      const { data } = await remote.getEpisodeByID(episodeid);
      if (!data) throw new Error('Cannot fetch data');
      await dispatch('setSeriesByID', { seriesid: data.series.id, data: data.series });
      commit('SET_EPISODE', { episodeid, data });
    },

    async setSeriesByID({ commit }, { seriesid, data }) {
      commit('SET_SERIES', { seriesid, data });
    },

    async fetchEpisodesBySeriesID({ commit }, { seriesid }) {
      const { data } = await remote.getEpisodesBySeriesID(seriesid);
      if (!data) throw new Error('Cannot fetch data');
      commit('SET_EPISODES_BY_SERIES', { seriesid, data });
    },

  },
};

export default episode;
