<template>
  <div class="loop-grid-container">
    <div class="loop-card-flex-container" v-for="loop in loopList" :key="loop.id">
      <LoopCard
      class="loop-card"
      :loopid="loop.id"
      />
      <CardDetails
      class="card-detail"
      :loopid="loop.id"
      :type="type"
      />
    </div>
  </div>
</template>

<script>
import LoopCard from './LoopCard';
import CardDetails from './CardDetails';

export default {
  name: 'LoopGrid',
  components: {
    LoopCard,
    CardDetails,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    episodeid: {
      type: String,
      required: false,
    },
  },
  computed: {
    loopList() {
      if (this.type === 'episode') {
        return this.$store.state.loop.loopList[this.episodeid];
      } else if (this.type === 'random') {
        return this.$store.state.loop.randomLoopList;
      }
      return undefined;
    },
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: unset;
}

.loop-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 360px));
  grid-gap: 1em;
  justify-content: center;

  margin-top: 1em;
}

.loop-card-flex-container {
  display: flex;
  flex-flow: column nowrap;
}

.loop-card {
  z-index: 15;
}

.card-detail {
  z-index: 10;
}


</style>
