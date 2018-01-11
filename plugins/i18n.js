import Vue from 'vue';
// import Vuex from 'vuex';
// import vuexI18n from 'vuex-i18n/dist/vuex-i18n.umd';
import VueI18n from 'vue-i18n';
// import store from '~/store';
import en from '~/locales/en.json';
import ja from '~/locales/ja.json';
import zh from '~/locales/zh.json';

// Vue.use(vuexI18n);

// const doDebug = process.env.NODE_ENV !== 'production'

Vue.use(VueI18n);

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.i18n.locale,
    fallbackLocale: 'en',
    messages: {
      zh,
      en,
      ja,
    },
  });
};
