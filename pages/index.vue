<template>
  <LoopGrid type="random" />
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
      title: 'Home | Animeloop',
    };
  },

  asyncData({ store }) {
    return store.dispatch('fetchRandomLoopList', { count: 12 });
  },

};

</script>

<style scoped>

</style>
