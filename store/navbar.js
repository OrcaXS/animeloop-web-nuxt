// import Vue from 'vue';

const navbar = {
  state: () => ({
    burgerOpen: false,
    searchOpen: false,
    langOpen: false,
  }),

  getters: {
  },

  mutations: {
    TOGGLE_NAVBAR_STATE: (state, { type }) => {
      // Vue.set(state, type, !state[type]);
      state[type] = !state[type];
    },
  },

  actions: {
    toggleNavbarState({ commit }, { type }) {
      if (type === 'burger') {
        commit('TOGGLE_NAVBAR_STATE', { type: 'burgerOpen' });
      } else if (type === 'search') {
        commit('TOGGLE_NAVBAR_STATE', { type: 'searchOpen' });
      } else if (type === 'lang') {
        commit('TOGGLE_NAVBAR_STATE', { type: 'langOpen' });
      } else {
        throw Error('Wrong toggle type');
      }
    },
  },
};

export default navbar;
