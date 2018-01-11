<template>
  <LoopPage pageType="loop" />
</template>

<script>
import LoopPage from '~/components/Loop/';

export default {
  name: 'page-loop-id',
  components: {
    LoopPage,
  },

  head() {
    return {
      title: `${this.loop.episode.no} | ${this.i18nTitle} | Animeloop`,
    };
  },

  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch('fetchLoopByID', { loopid: id });
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
      return this.$store.state.loop.loops[this.$route.params.id];
    },
  },
};
</script>

<style scoped>

</style>
