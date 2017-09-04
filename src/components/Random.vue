<template>
  <div class="grid-container">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      Error: {{ error }}
    </div>
    <LoopCard class="loop-card" :imgUri="imgUris" :videoUri="videoUris" />
    <div class="tags">
      <span class="tag">{{ titles['japanese'] }}</span>
      <span class="tag">{{ titles['romaji'] }}</span>
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
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LoopCard from './partial/LoopCard';

export default {
  name: 'random',
  components: {
    LoopCard,
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
      console.log('canplaythrough');
      this.toggleVidLoading(false);
      this.toggleVidLoaded(true);
    },
  },
  computed: {
    imgStyleDisplay() {
      return {
        display: this.hovered ? 'none' : 'inherit',
      };
    },
    ...mapState({
      error: state => state.fetchRandom.error,
      hovered: state => state.fetchRandom.hovered,
      vidLoading: state => state.fetchRandom.vidLoading,
      vidLoaded: state => state.fetchRandom.vidLoaded,
      loading: state => state.fetchRandom.loading,
      loaded: state => state.fetchRandom.loaded,
      _id: state => state.fetchRandom.randState._id,
      imgUris(state) {
        return {
          '360p': state.fetchRandom.randState.files.jpg_360p,
          '720p': state.fetchRandom.randState.files.jpg_720p,
          '1080p': state.fetchRandom.randState.files.jpg_1080p,
        };
      },
      videoUris(state) {
        return {
          '360p': state.fetchRandom.randState.files.mp4_360p,
          '720p': state.fetchRandom.randState.files.mp4_720p,
          '1080p': state.fetchRandom.randState.files.mp4_1080p,
        };
      },
      titles(state) {
        return {
          japanese: state.fetchRandom.randState.series.title_japanese,
          romaji: state.fetchRandom.randState.series.title_romaji,
        };
      },
    }),
  },
  created() {
    this.$store.dispatch('fetchRandom');
  },
};

</script>

<style scoped>
.loop-card {
  display: block;
  /*width: 100%;*/
  /*height: 100%;*/
}

.video-container {
  /*width: 50vw;*/
  object-fit: cover;
  width: 100%;
}

.video-cover {
  /*display: inline-block;*/
  background-size: cover;
  transition: all 0.5s;
}

.blur {
  filter: blur(10px);
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em 1em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
