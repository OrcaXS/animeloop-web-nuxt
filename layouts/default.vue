<template>
  <div class="layout-container" :lang="langAttr">
    <header>
      <NavbarContainer />
    </header>
    <main>
      <nuxt class="main"/>
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
  computed: {
    langAttr() {
      return this.$store.state.i18n.locale || '';
    },
  },
};
</script>

<style lang="postcss">
@import "../assets/css/mediaquery.css";

html {
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; */
  font-family: "Helvetica Neue", system-ui;
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

main {
  margin-top: 4em;

  @media (--tablet-screen) {
    margin-top: 7em;
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
