<template>
  <LoopGrid
    class="home-page"
    page-type="random"
  />
</template>

<script>
import LoopGrid from '~/components/Loop/Grid';

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

  async fetch({ store, error }) {
    try {
      await store.dispatch('fetchRandomLoopList', { count: 12 });
    } catch (err) {
      error({ statusCode: 404, message: 'API returned error', customMsg: err.message });
    }
  },

};

</script>
<style scoped lang="postcss">
@import "~/assets/css/mediaqueries.css";

.home-page {
  @media (--tablet-screen) {
    margin-left: -1em;
    margin-right: -1em;
  }
}

</style>
