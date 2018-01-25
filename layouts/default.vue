<template>
  <div class="layout-container">
    <header>
      <NavbarContainer />
    </header>
    <main class="layout-main">
      <nuxt />
    </main>
  </div>
</template>

<script>
import NavbarContainer from '~/components/Navbar';
import ogIcon from '~/assets/images/icon.png';

export default {
  name: 'Layout',
  components: {
    NavbarContainer,
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.langAttr,
      },
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Animeloop Beta' },
        { hid: 'og:image', name: 'og:image', content: ogIcon },
        { hid: 'og:description', property: 'og:description', content: 'Animeloop Web Frontend' },
      ],
    };
  },
  computed: {
    langAttr() {
      return this.$store.state.i18n.locale || 'en';
    },
  },
};
</script>

<style lang="postcss">
@import "../assets/css/mediaquery.css";

html {
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; */
  font-family: "Helvetica Neue", system-ui, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.layout-container {
  width: 100%;

  display: grid;
  grid-column-gap: 1em;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
  "nav"
  "main";

  & a {
    text-decoration: none;
    color: black;
  }
}

.layout-main {
  margin: 4em 1em 1em 1em;

  @media (--tablet-screen) {
    margin: 7em .5em 1em .5em;
    /* padding: 0 .5em; */
    /* Dirty hack for iPhoneX, with iOS 11.1 fallback */
    @supports(padding: min(0px)) {
      margin: 7em 0 0 0;
      padding-left: max(8px, constant(safe-area-inset-left));
      padding-left: max(8px, env(safe-area-inset-left));
      padding-right: max(8px, constant(safe-area-inset-right));
      padding-right: max(8px, env(safe-area-inset-right));
      padding-bottom: max(8px, constant(safe-area-inset-bottom));
      padding-bottom: max(8px, env(safe-area-inset-bottom));
    }
  }

  @media (--phone-screen) {
    margin: 4em 0em;
  }

}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  line-height: 1.2;
}

.tag {
  font-family: 'Open Sans', Arial, sans-serif;
  /* line-height: 1.0; */
}

</style>
