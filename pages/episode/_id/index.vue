<template>
  <SeriesPage
    :seriesid="episodes.series.id"
    :episodeid="episodeid"
    :episodeno="episodes.no"
  />
</template>

<script>
import SeriesPage from '~/components/Series/';

export default {
  name: 'PageEpisodeID',
  components: {
    SeriesPage,
  },

  computed: {
    episodes() {
      return this.$store.state.episode.episodes[this.$route.params.id];
    },
  },

  asyncData({ params }) {
    return {
      // seriesID: this.episode.series.id,
      episodeid: params.id,
    };
  },

  async fetch({ store, error, params: { id } }) {
    try {
      await store.dispatch('fetchEpisodeByID', { episodeid: id });
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
