/* eslint-disable no-shadow, no-param-reassign */
import fetchGen from './fetch';

const fetchOptions = {
  method: 'get',
};

const fetchUri = 'https://animeloop.org/api/rand';

const state = {
  vidLoading: false,
  vidLoaded: false,
  hovered: false,
  loading: false,
  loaded: false,
  error: null,
  randState: {},
};

const getters = {
  // randId: state => {
  //   return state.randState._id
  // }
  // randVideo: state => {
  //   return state.randState.
  // }
};

const mutations = {
  SET_HOVERED: (state, isHovered) => {
    state.hovered = isHovered;
  },
  SET_STATE: (state, result) => {
    Object.assign(state.randState, result);
  },
  SET_LOADING: (state, isLoading) => {
    state.loading = isLoading;
  },
  SET_LOADED: (state, isLoaded) => {
    state.loaded = isLoaded;
  },
  SET_VIDLOADED: (state, isLoaded) => {
    state.vidLoaded = isLoaded;
  },
  SET_VIDLOADING: (state, isLoading) => {
    state.vidLoading = isLoading;
  },
  SET_ERROR: (state, err) => {
    state.error = err.toString();
  },
};

const actions = {
  toggleHovered({ commit }, isHovered) {
    commit('SET_HOVERED', isHovered);
  },
  toggleVidLoading({ commit }, isVidLoading) {
    commit('SET_VIDLOADING', isVidLoading);
  },
  toggleVidLoaded({ commit }, isVidLoaded) {
    commit('SET_VIDLOADED', isVidLoaded);
  },

  async fetchRandom({ commit }) {
    try {
      commit('SET_LOADING', true);
      const response = await fetchGen(fetchUri, fetchOptions);
      commit('SET_LOADING', false);
      commit('SET_LOADED', true);
      console.log(response);
      commit('SET_STATE', response);
    } catch (e) {
      commit('SET_LOADING', false);
      commit('SET_ERROR', e);
      console.log(e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
