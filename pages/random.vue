<template>
  <LoopPage pageType="random" />
</template>

<script>
import LoopPage from '~/components/Loop/';

export default {
  name: 'page-random',
  components: {
    LoopPage,
  },

  head() {
    return {
      title: `${this.loop.episode.no} | ${this.i18nTitle} | Random | Animeloop`,
    };
  },

  async fetch({ store }) {
    await store.dispatch('fetchRandomLoop');
  },

  computed: {
    i18nTitle() {
      switch (this.currentLocale) {
        case 'ja':
          return this.loop.series.title_japanese;
        case 'zh':
          return this.loop.series.title;
        case 'en':
          return this.loop.series.title_english;
        default:
          return this.loop.series.title_english;
      }
    },

    currentLocale() {
      return this.$store.state.i18n.locale;
    },

    loop() {
      return this.$store.state.loop.loops[this.$store.state.loop.randomPageLoopID];
    },
  },
};
</script>

<style scoped>

</style>
