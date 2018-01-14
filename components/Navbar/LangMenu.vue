<template>
  <div class="lang-menu-container" v-click-outside="onClickOutside">
    <div>
      <div class="lang-icon-container" @click="toggleLang">
        <button class="lang-icon"><font-awesome-icon icon="language"></font-awesome-icon></button>
        <button class="lang-icon down"><font-awesome-icon icon="angle-down"></font-awesome-icon></button>
      </div>
      <div
        class="lang-menu-dropdown"
        :style="toggleLangStyle"
      >
        <template v-for="locale in localeList">
          <p class="lang-item" :class="{ 'lang-selected': currentLocale === locale.id }" @click="setLanguage(locale.id)">{{ locale.text }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

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
  methods: {
    toggleLang() {
      this.$store.dispatch('toggleNavbarState', { type: 'lang' });
    },

    onClickOutside() {
      if (this.navStates.langOpen) {
        this.toggleLang();
      }
    },

    setLanguage(lang) {
      this.$store.dispatch('setLang', { lang });
    },
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

};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

.lang-menu-container {
  @media (--phone-screen) {
    margin-left: auto;
    flex: 0 1 30%;
    justify-content: flex-end;
  }

  display: flex;
  /* padding: 0 .2em; */
  /* flex-direction: column; */
  /* flex-wrap: wrap; */

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

}

.lang-icon {
  display: block;
  font-size: 1.2em;
  margin-left: 1rem;
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
  font-size: 1.4em;

  &.down {
    font-size: 1em;
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
  padding: .6em;
}

.lang-selected {
  /* margin: 0; */
  padding: .6em .6em .6em .3em;
  border-left: .3em solid #1E50A2;
}


</style>
