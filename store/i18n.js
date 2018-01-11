import Vue from 'vue';

const i18n = {
  state: {
    locale: '',
  },

  getters: {
  },

  mutations: {
    SET_LANG: (state, { lang }) => {
      Vue.set(state, 'locale', lang);
      // state.locale = lang;
      // VueCookie.set('locale', lang);


      // this.app.$i18n.locale = lang;
    },
  },

  actions: {
    async setLang({ dispatch, commit }, { lang }) {
      commit('SET_LANG', { lang });
      commit('TOGGLE_NAVBAR_STATE', { type: 'langOpen' });
      // this.app.$cookies.set('locale', lang);
      await dispatch('setLangCookie', { lang });
      await dispatch('setAppLang', { lang });
    },
    async setLangCookie({ commit }, { lang }) {
      try {
        // console.log(lang);
        this.app.$cookies.set('locale', lang);
      } catch (err) {
        throw new Error(`Cannot modify cookies.
          ${err}`);
      }
    },
    async setAppLang({ commit }, { lang }) {
      try {
        // console.log(lang);
        // console.table(this.app);
        this.app.i18n.locale = lang;
      } catch (err) {
        throw new Error(`Cannot set app lang.
          ${err}`);
      }
    },
  },
};

export default i18n;
