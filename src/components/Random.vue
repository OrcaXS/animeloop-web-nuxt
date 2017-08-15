<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      Error: {{ error }}
    </div>
    <div v-if="loaded" class="grid-container">
      <section class="video-container">
        <a class="grid-item" :key="_id" :loop-id="_id" @mouseover="toggleHovered(true)" @mouseout="toggleHovered(false)">
          <!-- <transition name="fade" mode="out-in"> -->
            <img class="inline-img" width="100%" v-if="!hovered" :src="imageUri" key="img">
            <video loop muted autoplay width="100%" v-if="hovered" :src="videoUri" @loadstart.once="loadStart()" @canplay.once ="canplay()"></video>
            <!-- <cube-shadow v-if="hovered"></cube-shadow> -->
          <!-- </transition> -->
        </a>
      </section>
      <div class="tags">
        <span class="tag">One</span>
        <span class="tag">Two</span>
        <span class="tag">Three</span>
      </div>
      <article class="message">
        <div class="message-header">
          <p>Random API Info</p>
        </div>
        <div class="message-body">
          {{ this.$store.state.fetchRandom.randState }}
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import LoopCard from './partial/LoopCard';
import CubeShadow from 'vue-loading-spinner/src/components/CubeShadow';

export default {
  name: 'random',
  components: {
    CubeShadow,
    // LoopCard,
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions([
      'toggleHovered',
      'toggleVidLoaded',
      'toggleVidLoading',
    ]),
    loadStart() {
      console.log('loadingStarted');
      this.toggleVidLoading(true);
    },
    canplay() {
      console.log('canplay');
      this.toggleVidLoading(false);
      this.toggleVidLoaded(true);
    },
  },
  computed: {
    ...mapState({
      error: state => state.fetchRandom.error,
      hovered: state => state.fetchRandom.hovered,
      vidLoading: state => state.fetchRandom.vidLoading,
      vidLoaded: state => state.fetchRandom.vidLoaded,
      loading: state => state.fetchRandom.loading,
      loaded: state => state.fetchRandom.loaded,
      videoUri: state => state.fetchRandom.randState.files.mp4_360p,
      imageUri: state => state.fetchRandom.randState.files.jpg_360p,
      _id: state => state.fetchRandom.randState._id,
    }),
  },
  created() {
    this.$store.dispatch('fetchRandom');
  },
};

</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em 1em;
}

.video-container {
  width: 50vw;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
