import remote from '~/api/fetch';

const search = {
  state: {
    searchResult: [/* Series id returned for search */],
  },

  mutations: {
    SET_SEARCH: (state, { data }) => {
      state.searchResult = [];
      data.forEach((val) => {
        // console.log(val);
        state.searchResult.push(val.id);
      });
    },

  },

  getters: {

  },

  actions: {
    async fetchSeriesByString({ dispatch, commit, state }, { searchString }) {
      const { data } = await remote.getSeriesByString(searchString);
      // console.log(data);
      commit('SET_SEARCH', { data });
      await dispatch('fillSearchtoSeries', { data });
      // commit('SET_MULTIPLE_SERIES', { data });
    },

    async fillSearchtoSeries({ commit }, { data }) {
      commit('SET_MULTIPLE_SERIES', { data });
    },

  },
};

export default search;
