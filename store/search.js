import remote from '~/assets/js/api/fetch';
import validate from '~/assets/js/utils/validate';

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
    async fetchSeriesByString({ dispatch, commit }, { searchString }) {
      if (/^[\w]{0,3}$/.test(searchString)) throw new Error('Keyword too short');
      commit('SET_SEARCHING', { data: true });
      const { data } = await remote.getSeriesByString(searchString);
      if (!validate.arr(data)) throw new Error('Cannot fetch data');
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
