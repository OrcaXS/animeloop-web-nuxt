import remote from '~/assets/js/api/fetch';

const search = {
  state: {
    searchResult: [/* Series id returned for search */],
    isSearching: false,
  },

  mutations: {
    SET_SEARCH: (state, { data }) => {
      state.searchResult = [];
      data.forEach((val) => {
        // console.log(val);
        state.searchResult.push(val.id);
      });
    },
    SET_SEARCHING: (state, { data }) => {
      state.isSearching = data;
    },

  },

  getters: {

  },

  actions: {
    async fetchSeriesByString({ dispatch, commit, state }, { searchString }) {
      commit('SET_SEARCHING', { data: true });
      const { data } = await remote.getSeriesByString(searchString);
      commit('SET_SEARCHING', { data: false });
      // console.log(data);
      commit('SET_SEARCH', { data });
      await dispatch('fillSeriesList', { data });
      // commit('SET_MULTIPLE_SERIES', { data });
    },

    async fillSeriesList({ commit }, { data }) {
      commit('SET_MULTIPLE_SERIES', { data });
    },

  },
};

export default search;
