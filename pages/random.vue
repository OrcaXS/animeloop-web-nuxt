<script>
export default {
  name: 'PageRandom',

  async fetch({ store, error, redirect }) {
    try {
      await store.dispatch('fetchRandomLoop');
    } catch (err) {
      error({ statusCode: 404, message: 'API returned Error' });
    }
    const randomLoopID = store.state.loop.randomPageLoopid;
    redirect(302, `/loop/${randomLoopID}`);
  },
};
</script>
