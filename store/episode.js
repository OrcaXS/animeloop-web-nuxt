import remote from '~/api/fetch';

const episode = {
  state: {
    episodes: {/* [id: episodeid]: Episode */},
  },

  mutations: {
    SET_EPISODE: (state, { episodeid, data }) => {
      state.episodes[episodeid] = data;
    },
  },

  getters: {

  },

  actions: {

  },
};

export default episode;
