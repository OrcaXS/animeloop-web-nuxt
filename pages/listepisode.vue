<template>
  <div>
    <LoopGrid
    :state="this.$store.state.fetchEpisodes"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LoopGrid from '../components/LoopGrid';
// import LoopCard from '../partial/LoopCard';
// import CardDetails from '../partial/CardDetails';

export default {
  name: 'ListEpisodes',
  metaInfo: {
    title: 'ListEpisodes',
  },
  components: {
    LoopGrid,
    // LoopCard,
    // CardDetails,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      status: state => state.fetchEpisodes.status,
      rawState: state => state.fetchEpisodes.rawState,
    }),
  },
  methods: {
  },
  created() {
    this.$store.dispatch('fetchEpisodes/fetchEpisodes', this.$route.params.episode_id);
  },
  mounted() {
    console.log('mounted');
  },
};

</script>

<style scoped>
a {
  color: unset;
}

</style>
