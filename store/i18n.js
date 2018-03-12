import Vue from 'vue';

const i18n = {
  state: {
    locale: '',
  },

  getters: {},

  mutations: {
    SET_LOCALE: (state, { locale }) => {
      Vue.set(state, 'locale', locale);
      // state.locale = lang;
      // this.app.$i18n.locale = lang;
    },
  },

  actions: {
    async setLang({ dispatch, commit }, { locale }) {
      commit('SET_LOCALE', { locale });
      commit('TOGGLE_NAVBAR_STATE', { type: 'langOpen' });
      // this.app.$cookies.set('locale', lang);
      await dispatch('setLangCookie', { locale });
      await dispatch('setAppLang', { locale });
    },
    setLangCookie(_, { locale }) {
      try {
        this.app.$cookies.set('locale', locale);
      } catch (err) {
        throw new Error(`Cannot modify cookies.
          ${err}`);
      }
    },
    setAppLang(_, { locale }) {
      try {
        this.app.i18n.locale = locale;
      } catch (err) {
        throw new Error(`Cannot set app locale.
          ${err}`);
      }
    },
  },
};

export default i18n;
