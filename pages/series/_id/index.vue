<template>
  <SeriesPage
    :seriesid="$route.params.id"
    episodeid=""
  />
</template>

<script>
import SeriesPage from '~/components/Series/';

export default {
  name: 'PageSeriesID',
  components: {
    SeriesPage,
  },

  data() {
    return {
      selectedEpisodeID: '',
    };
  },

  // fetch({ store, route: { params: { id } } }) {
  //   return store.dispatch('fetchEpisodesBySeriesID', { seriesid: id });
  // },

  computed: {
    series() {
      return this.$store.state.series.series[this.$route.params.id];
    },

    // episodes() {
    //   return this.$store.state.episode.episodeList[this.$route.params.id];
    // },
  },

  async fetch({ store, error, params: { id } }) {
    try {
      await store.dispatch('fetchSeriesByID', { seriesid: id });
    } catch (err) {
      error({ statusCode: 404, message: 'API returned Error', customMsg: err.message });
    }
  },

  validate({ params }) {
    return /^[a-z0-9]{24}$/.test(params.id);
  },

};
</script>

<style scoped>

</style>
