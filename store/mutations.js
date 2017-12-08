import Vue from 'vue';

export default {
  SET_LOOP: (state, { loopid, data }) => {
    state.loops[loopid] = data;
  },

  SET_LOOPLIST: (state, { data }) => {
    state.loopList = data;
  },

  SET_SERIES: (state, { type, ids }) => {
    state.lists[type] = ids;
  },

  SET_EPISODE: (state, { items }) => {
    items.forEach((item) => {
      if (item) {
        Vue.set(state.items, item.id, item);
      }
    });
  },
};
