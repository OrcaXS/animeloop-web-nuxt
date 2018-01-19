<template>
  <LoopGrid pageType="random" />
</template>

<script>
import LoopGrid from '~/components/Loop/LoopGrid';

export default {
  name: 'Home',
  components: {
    LoopGrid,
  },

  head() {
    return {
      title: `${this.$t('home')} | Animeloop`,
    };
  },

  async fetch({ store }) {
    await store.dispatch('fetchRandomLoopList', { count: 12 });
  },

};

</script>

<style scoped>

</style>
