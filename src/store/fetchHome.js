/* eslint-disable no-shadow, no-param-reassign */
import fetchGen from './fetch';

const fetchOptions = {
  method: 'get',
};

const fetchUri = 'http://localhost:7777/api/v1/loops?limit=12&populate=["episode", "series"]';

const state = {
  status: {
    loading: false,
    loaded: false,
    error: null,
  },
  vidLoading: false,
  vidLoaded: false,
  hovered: false,
  rawState: {},
};

const getters = {
  // getImgUris: (state) => {
  //   Object.values(state.rawState).forEach((ele) => {
  //     const { jpg_360p, jpg_720p, jpg_1080p } = ele.files;
  //     // console.log(ele.files);
  //     console.log({ jpg_360p, jpg_720p, jpg_1080p });
  //     return { jpg_360p, jpg_720p, jpg_1080p };
  //   });
  // },
};

const mutations = {
  SET_HOVERED: (state, isHovered) => {
    state.hovered = isHovered;
  },
  SET_STATE: (state, result) => {
    state.rawState = result;
  },
  SET_LOADING: (state, isLoading) => {
    state.status.loading = isLoading;
  },
  SET_LOADED: (state, isLoaded) => {
    state.status.loaded = isLoaded;
  },
  SET_VIDLOADED: (state, isLoaded) => {
    state.vidLoaded = isLoaded;
  },
  SET_VIDLOADING: (state, isLoading) => {
    state.vidLoading = isLoading;
  },
  SET_ERROR: (state, err) => {
    state.status.error = err.toString();
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

  async fetchHome({ commit }) {
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
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
