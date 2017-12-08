<template>
  <section class="loop-page-grid-container">
    <BreadCrumb class="breadcrumb">
      <a type="title" slot="title" href="#">{{loop.series.title_japanese}}</a>
      <a type="no" slot="no" href="#">{{loop.episode.no}}</a>
    </BreadCrumb>
    <div class="loop-card">
      <LoopCard :id="loop.id" />
    </div>
    <div class="loop-info">
      <LoopInfo :id="loop.id" />
    </div>
    <div class="vertical-title"></div>
  </section>
</template>

<script>
import LoopInfo from '~/components/LoopInfo';
import LoopCard from '~/components/LoopCard';
import BreadCrumb from '~/components/BreadCrumb';

export default {
  name: 'loop-view',
  components: {
    BreadCrumb,
    LoopInfo,
    LoopCard,
  },

  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch('fetchLoop', { loopid: [id] });
  },

  computed: {
    loop() {
      return this.$store.state.loops[this.$route.params.id];
    },
  },
};
</script>

<style scoped>
.loop-page-grid-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  grid-gap: 1em 2em;
  grid-template-areas:
  "breadcrumb vertical-title"
  "loop-card vertical-title"
  "loop-info vertical-title";

  margin-top: 1em;
}

.vertical-title {
  grid-area: vertical-title;
  writing-mode: vertical-rl;
  color: #BBBBBB;
  font-size: 3em;
  max-height: 12em;

  white-space: normal;
  word-break: normal;
}

.loop-card {
  grid-area: loop-card;
  width: 100%;
}

.loop-info {

};

.breadcrumb {
  grid-area: breadcrumb;
}

</style>
