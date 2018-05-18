<template>
  <div
    v-click-outside="onClickOutside"
    class="NavbarLangMenu"
  >
    <div>
      <button
        class="NavbarLangMenu-icon"
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
        class="NavbarLangMenu-dropdown"
      >
        <button
          v-for="locale in localeList"
          :key="locale.id"
          :class="{ 'NavbarLangMenu-selected': currentLocale === locale.id }"
          class="NavbarLangMenu-dropdownItem"
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
/** @define NavbarLangMenu */
@import "~/assets/css/mediaqueries.css";

.NavbarLangMenu {
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

.NavbarLangMenu-icon {
  display: flex;
  align-items: center;
  border: none;

  &:focus {
    outline: none;
  }

  &:hover {
    border-bottom: .15rem solid var(--accent-color-light);
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

.NavbarLangMenu-dropdown {
  display: none;
  position: absolute;
  background: white;
  box-shadow: 0 6px 6px 0px rgba(0, 0, 0, 0.1);
}

.NavbarLangMenu-dropdownItem {
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
    border-left: .3em solid rgba(var(--accent-color-light), 0.8);
  }
}

.NavbarLangMenu-selected {
  padding: .6em .6em .6em .3em;
  border-left: .3em solid var(--accent-color-light);
}


</style>
