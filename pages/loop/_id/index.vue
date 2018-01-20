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
      meta: [
        { vmid: 'twitter:card', name: 'twitter:card', content: 'player' },
        { vmid: 'twitter:site', name: 'twitter:site', content: '@animeloopbot' },
        { vmid: 'twitter:title', name: 'twitter:title', content: `${this.loop.series.title_japanese} | ${this.formattedTimeStamps.begin} - ${this.formattedTimeStamps.end}` },
        { vmid: 'twitter:description', name: 'twitter:description', content: 'View the loop on Animeloop.' },
        { vmid: 'twitter:image', name: 'twitter:image', content: this.loop.files.jpg_1080p },
        { vmid: 'og:title', name: 'og:title', content: `${this.loop.series.title_japanese} | ${this.formattedTimeStamps.begin} - ${this.formattedTimeStamps.end}` },
        { vmid: 'og:image', name: 'og:image', content: this.loop.files.jpg_1080p },
        { vmid: 'og:description', property: 'og:description', content: 'View the loop on Animeloop.' },
        { vmid: 'og:site_name', name: 'og:site_name', content: 'Animeloop Beta' },
        { vmid: 'og:video:secure_url', property: 'og:video:secure_url', content: this.loop.files.mp4_1080p },
        { vmid: 'og:video:type', property: 'og:video:type', content: 'video/mp4' },
        { vmid: 'og:video:width', property: 'og:video:width', content: '1920' },
        { vmid: 'og:video:height', property: 'og:video:height', content: '1080' },
      ],
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

    formattedTimeStamps() {
      return this.$store.getters.formatTimeStamps(this.$route.params.id);
    },
  },
};
</script>

<style scoped>

</style>
