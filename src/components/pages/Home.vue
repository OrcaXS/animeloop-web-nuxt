<template>
  <div>
    <section v-if="!status.loaded" class="before-loading">
      <div v-if="status.loading" class="loading" >
        <icon name="circle-o-notch" spin></icon>
        Fetching from API
      </div>
      <div v-if="status.error" class="error">
        Error: {{ status.error }}
      </div>
    </section>
    <div class="grid-container">
      <div class="grid-item flex-container" v-for="item in rawState" :key="item._id">
        <LoopCard
        class="loop-card"
        :img-uri="item.files"
        :video-uri="item.files"
        />
        <CardDetails
        :title="item.series.title"
        :period="item.period"
        :episode_no="item.episode.no"
        :anime_type="item.series.type"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LoopCard from '../partial/LoopCard';
import CardDetails from '../partial/CardDetails';


export default {
  name: 'Home',
  metaInfo: {
    title: 'Home',
  },
  components: {
    LoopCard,
    CardDetails,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      status: state => state.fetchHome.status,
      rawState: state => state.fetchHome.rawState,
    }),
  },
  methods: {
  },
  created() {
    this.$store.dispatch('fetchHome/fetchHome');
  },
  mounted() {
    console.log('mounted');
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0.5
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 360px));
  grid-gap: 1em;
  justify-content: center;
}

.box {
  padding: 5px;
}

.grid-item {
  background-size: cover;
  position: relative;
  /*max-height: 203px;*/
  height: auto;
}

.inline-img {
  display: inherit;
}

.flex-container {
  display: inline-flex;
  flex-direction: column;
}

/*.loop-card {
  position: relative;
}*/
/*.flex-item {
margin: 2px;
height: 203px;
width: 360px;
}*/


</style>
