<template>
  <SeriesGrid type="search" />
</template>

<script>
import SeriesGrid from '~/components/SeriesGrid';

export default {
  components: {
    SeriesGrid,
  },

  fetch({ store, route: { params: { keyword } } }) {
    return store.dispatch('fetchSeriesByString', { searchString: keyword });
  },

};
</script>

<style>

</style>
