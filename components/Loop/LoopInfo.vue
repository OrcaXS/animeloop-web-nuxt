<template>
  <div class="loop-info-grid-container">
    <p class="info-type" v-t="'loop.timestamps'"></p>
    <p class="info-detail">{{ formattedTimeStamps.begin }} - {{ formattedTimeStamps.end }}</p>
    <p class="info-type" v-t="'loop.length'"></p>
    <p class="info-detail">{{ formattedTimeStamps.duration }}s</p>
    <p class="info-type" v-t="'loop.downloads'"></p>
    <div class="info-detail">
      <Downloads :loopid="this.loopid" />
    </div>
  </div>
</template>

<script>
import Downloads from './Downloads';

export default {
  name: 'LoopInfo',
  props: ['loopid'],
  components: {
    Downloads,
  },

  computed: {
    loop() {
      return this.$store.state.loop.loops[this.loopid];
    },

    formattedTimeStamps() {
      return this.$store.getters.formatTimeStamps(this.loopid);
    },
  },

};
</script>

<style>
.loop-info-grid-container {
  grid-area: loop-info;

  display: grid;
  /*justify-content: space-around;*/
  align-items: start;

  /*alignment hack*/
  grid-template-columns: minmax(1fr, max-content) auto auto;
  grid-template-rows: auto auto;
  grid-auto-flow: column;
  grid-gap: 1em;
  justify-content: stretch;
}

.info-type {
  font-weight: 500;
}

.info-detail {
  font-weight: 400;
}

</style>
