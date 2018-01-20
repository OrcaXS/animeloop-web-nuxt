<template>
  <div class="layout-container">
    <header>
      <NavbarContainer />
    </header>
    <main class="layout-main">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import NavbarContainer from '~/components/Navbar';

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

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
