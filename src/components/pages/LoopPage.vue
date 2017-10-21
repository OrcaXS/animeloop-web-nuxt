<template>
  <div>
    <section v-if="!status.loaded" class="before-loading">
      <div v-if="status.loading" class="loading" >
        <icon name="circle-o-notch" spin></icon>
        Fetching from API
      </div>
      <div v-if="status.error" class="error">
        Error: {{ error }}
      </div>
    </section>
    <div v-if="status.loaded" class="grid-container">
      <!-- <LoopCard class="loop-card" :imgUri="imgUris" :videoUri="videoUris" /> -->
      <LoopCard
        class="loop-card"
        :img-uri="loopState.files"
        :video-uri="loopState.files"
      />
      <div class="tags">
        <span class="tag">{{ title.japanese }}</span>
        <span class="tag">{{ title.romaji }}</span>
        <span class="tag">{{ loopState.period['begin'] }} - {{ loopState.period['end'] }}</span>
        <span class="tag">{{ id }}</span>
      </div>
      <article class="message">
        <div class="message-header">
          <p>{{ title.japanese }} {{ loopState.episode.no }}</p>
        </div>
        <div class="message-body">
          {{ loopState.series.description }}
        </div>
      </article>
      <article class="message is-info">
        <div class="message-header">
          <p>API Info directed from {{ id }}</p>
        </div>
        <div class="message-body">
          <code>
          {{ loopState }}
          </code>
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
  name: 'LoopPage',
  metaInfo: {
    title: 'LoopPage',
  },
  props: {
    id: String,
    required: true,
  },
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
      status: state => state.fetchLoop.status,
      loopState: state => state.fetchLoop.loopState,
    }),
    title() {
      const series = this.loopState.series;
      return {
        chinese: series.title,
        english: series.title_english,
        japanese: series.title_japanese,
        romaji: series.title_romaji,
      };
    },
    // imgUris() {
    //   return this.loopState.files;
    // },
    // videoUris() {
    //   return this.loopState.files;
    // },
  },
  created() {
    this.$store.dispatch('fetchLoop/fetchLoop', this.$route.params.id);
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
code {
  background-color: unset;
  color: unset;
}

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
