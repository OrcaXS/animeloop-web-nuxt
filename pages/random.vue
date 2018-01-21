<template>
  <LoopPage page-type="random" />
</template>

<script>
import LoopPage from '~/components/Loop/';

export default {
  name: 'PageRandom',
  components: {
    LoopPage,
  },

  head() {
    return {
      title: `${this.loop.episode.no} | ${this.i18nTitle} | Random | Animeloop`,
    };
  },

  async fetch({ store, error }) {
    try {
      await store.dispatch('fetchRandomLoop');
    } catch (err) {
      error({ statusCode: 404, message: 'API returned Error' });
    }
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
      return this.$store.state.loop.loops[this.$store.state.loop.randomPageLoopid];
    },
  },
};
</script>
