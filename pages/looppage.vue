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
      <section>
        <BreadCrumb
        class="breadcrumb"
        :title="title.japanese"
        :episode="loopState.episode.no"
        :id="id"
        :episode_id="loopState.episode._id"
        />
      </section>
      <LoopCard
      class="loop-card"
      :img-uri="loopState.files"
      :video-uri="loopState.files"
      />
      <section class="loop-info">
        <!-- <div class="tags">
          <span class="tag">{{ title.japanese }}</span>
          <span class="tag">{{ title.romaji }}</span>
          <span class="tag">{{ loopState.period['begin'] }} - {{ loopState.period['end'] }}</span>
          <span class="tag">{{ id }}</span>
        </div> -->
        <section class="loop-info-title">Episode</section>
        <section class="loop-info-content">{{ title.japanese }} {{ loopState.episode.no }}</section>
        <section class="loop-info-title">時間帯</section>
        <section class="loop-info-content">{{ loopState.period['begin'].slice(0, -3) }} - {{ loopState.period['end'].slice(0, -3) }}</section>
        <section class="loop-info-title">時長</section>
        <section class="loop-info-content">{{ loopState.duration.toFixed(3) }}</section>
        <section class="loop-info-title">ファイル</section>
        <section class="loop-info-content">Files</section>
      </section>
      <section class="api-info">
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
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BreadCrumb from '../components/BreadCrumb';
import LoopCard from '../components/LoopCard';

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
    BreadCrumb,
    LoopCard,
  },
  data() {
    return {
      random: false,
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
    isRandom() {
      if (this.$route.name === 'Random') {
        this.random = true;
      }
    },
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
      const { series } = this.loopState;
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
    if (this.$route.name === 'Random') {
      this.$store.dispatch('fetchLoop/fetchRandom');
    } else {
      this.$store.dispatch('fetchLoop/fetchLoop', this.$route.params.id);
    }
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
@import url('//fonts.googleapis.com/earlyaccess/notosansjapanese.css')；

code {
  background-color: unset;
  color: unset;
}

.breadcrumb {
  grid-area: breadcrumb;
}

.loop-info {
  grid-area: loop-info;

  display: grid;
  /*justify-content: space-around;*/
  align-items: center;
  grid-template-columns: auto;
  grid-template-rows: repeat(auto-fill, minmax(4em,1fr));

  font-family: 'Noto Sans Japanese', sans-serif;
  writing-mode: vertical-rl;

  & .loop-info-title {
    /*display: block;*/
    font-size: 22pt;
  }

  &.loop-info-content {
    /*display: block;*/
  }
}

.api-info {
  grid-area: api-info;
}

.loop-card {
  display: block;
  grid-area: loop-card;
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
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-gap: 1em 1em;
  grid-template-areas:
  "breadcrumb breadcrumb"
  "loop-card loop-info"
  "api-info api-info"
}

@media (width <= 800px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

</style>
