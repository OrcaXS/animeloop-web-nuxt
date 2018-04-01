<template>
  <div
    v-click-outside="onClickOutside"
    class="lang-menu-container"
  >
    <div>
      <button
        class="lang-icon-container"
        aria-label="Select Language Button"
        @click="toggleLang"
      >
        <FontAwesomeIcon icon="language" />
        <FontAwesomeIcon
          class="down"
          icon="angle-down"
        />
      </button>
      <div
        :style="toggleLangStyle"
        class="lang-menu-dropdown"
      >
        <button
          v-for="locale in localeList"
          :key="locale.id"
          :class="{ 'lang-selected': currentLocale === locale.id }"
          class="lang-item"
          @click="setLanguage(locale.id)"
        >{{ locale.text }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

/**
 * Language Menu of the Navbar.
 */
export default {
  name: 'NavbarLangMenu',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      localeList: [
        { id: 'zh', text: '中文' },
        { id: 'en', text: 'English' },
        { id: 'ja', text: '日本語' },
      ],
    };
  },
  computed: {
    navStates() {
      return this.$store.state.navbar;
    },

    toggleLangStyle() {
      if (this.navStates.langOpen) return { display: 'block' };
      return {};
    },

    currentLocale() {
      return this.$store.state.i18n.locale;
    },
  },
  methods: {
    toggleLang() {
      this.$store.dispatch('toggleNavbarState', { type: 'lang' });
    },

    onClickOutside() {
      if (this.navStates.langOpen) {
        this.toggleLang();
      }
    },

    setLanguage(locale) {
      this.$store.dispatch('setLang', { locale });
    },
  },


};
</script>

<style scoped lang="postcss">
@import "~/assets/css/colors.css";
@import "~/assets/css/mediaqueries.css";

.lang-menu-container {

  display: flex;
  /* padding: 0 .2em; */
  /* flex-direction: column; */
  flex-shrink: 0;

  @media (--phone-screen) {
    margin-left: auto;
    flex: 0 1 25%;
    justify-content: flex-end;
  }


  & > div {
    position: relative;
  }
}

.lang-icon-container {
  display: flex;
  align-items: center;
  border: none;

  &:focus {
    outline: none;
  }

  &:hover {
    border-bottom: .15rem solid var(--key-color-light);
    margin-bottom: -.15rem;
  }

  color: #333333;

  margin-left: 1rem;

  border: none;
  outline: none;
  padding: 0;
  background: transparent;

  font-size: 1.4em;

  & .down {
    font-size: .75em;
    margin-left: .5rem;
  }
}

.lang-menu-dropdown {
  display: none;
  position: absolute;
  background: white;
  box-shadow: 0 6px 6px 0px rgba(0, 0, 0, 0.1);
}

.lang-item {
  border: none;
  outline: none;
  padding: 0;
  background: transparent;

  font-size: 1em;
  padding: .6em;
  cursor: pointer;

  color: var(--black1);

  &:hover {
    padding: .6em .6em .6em .3em;
    border-left: .3em solid rgba(var(--key-color-light), 0.8);
  }
}

.lang-selected {
  padding: .6em .6em .6em .3em;
  border-left: .3em solid var(--key-color-light);
}


</style>
