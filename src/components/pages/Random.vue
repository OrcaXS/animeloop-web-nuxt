<template>
  <div>
    <section v-if="!loaded" class="before-loading">
      <div v-if="loading" class="loading" >
        <icon name="circle-o-notch" spin></icon>
        Fetching from API
      </div>
      <div v-if="error" class="error">
        Error: {{ error }}
      </div>
    </section>
    <div v-if="loaded" class="grid-container">
      <!-- <LoopCard class="loop-card" :imgUri="imgUris" :videoUri="videoUris" /> -->
      <LoopCardP class="loop-card" :imgUri="imgUris" :videoUri="videoUris" />
      <div class="tags">
        <span class="tag">{{ titles['japanese'] }}</span>
        <span class="tag">{{ titles['romaji'] }}</span>
        <span class="tag">{{ period['begin'] }} - {{ period['end'] }}</span>
        <span class="tag">{{ _id }}</span>
      </div>
      <article class="message">
        <div class="message-header">
          <p>{{ titles['japanese'] }} {{ episode['no'] }}</p>
        </div>
        <div class="message-body">
          {{ series.description }}
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import Pressure from 'pressure';
import LoopCard from '../partial/LoopCard';
import LoopCardP from '../partial/LoopCardP';

export default {
  name: 'random',
  components: {
    LoopCard,
    LoopCardP,
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
      series: state => state.fetchRandom.randState.series,
      episode: state => state.fetchRandom.randState.episode,
      period: state => state.fetchRandom.randState.period,
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

// Pressure.set('#polyfill-example', {
//   change(force, event) {
//     this.innerHTML = force;
//   },
//   unsupported() {
//     alert('Oh no, this device does not support pressure.');
//   },
// }, { polyfill: false });

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

@media (width <= 800px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

</style>
