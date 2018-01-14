<template>
  <SeriesPage :seriesid="$route.params.id" episodeid="" />
</template>

<script>
import SeriesPage from '~/components/Series/';

export default {
  name: 'SeriesIDRoute',
  components: {
    SeriesPage,
  },

  data() {
    return {
      selectedEpisodeID: '',
    };
  },

  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch('fetchSeriesByID', { seriesid: id });
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

};
</script>

<style scoped>

</style>
