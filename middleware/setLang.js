export default function ({
  isHMR, app, store, route, params, error, redirect,
}) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;
  if (store.state.i18n.locale) {
    // app.i18n.locale = store.state.i18n.locale;
    return;
  }
  const { locale } = app.$cookies.cookies;
  // console.log(app.$cookies.cookies.locale);
  app.i18n.locale = locale;
  // Set locale
  store.commit('SET_LANG', { lang: locale });
  // app.i18n.locale = store.state.locale;
}