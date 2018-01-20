<template>
  <LoopPage page-type="loop" />
</template>

<script>
import LoopPage from '~/components/Loop/';

export default {
  name: 'PageLoopID',
  components: {
    LoopPage,
  },

  head() {
    return {
      title: `${this.loop.episode.no} | ${this.i18nTitle} | Animeloop`,
    };
  },

  async fetch({ store, error, params: { id } }) {
    try {
      await store.dispatch('fetchLoopByID', { loopid: id });
    } catch (err) {
      console.log(err);
      error({ statusCode: 404, message: 'API returned Error' });
    }
  },

  validate({ params }) {
    return /^[a-z0-9]{24}$/.test(params.id);
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
