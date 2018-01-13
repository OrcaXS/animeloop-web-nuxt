<template>
  <div v-if="type==='random'" class="loop-grid-container">
    <div class="loop-card-flex-container" v-for="loop in loopList" :key="loop">
      <nuxt-link :to="{ name: 'loop-id', params: { id: loop }}">
        <LoopCard
        class="loop-card"
        :loopid="loop"
        loopType="gif"
        />
        <CardDetails
        class="card-detail"
        :loopid="loop"
        type="loop"
        />
      </nuxt-link>
    </div>
  </div>
  <div v-else class="loop-grid-container">
    <div class="loop-card-flex-container" v-for="loop in loopList" :key="loop.id">
      <nuxt-link :to="{ name: 'loop-id', params: { id: loop.id }}">
        <LoopCard
        class="loop-card"
        :loopid="loop.id"
        />
        <CardDetails
        class="card-detail"
        :loopid="loop.id"
        :type="type"
        />
      </nuxt-link>
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
      default: '',
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

<style scoped>
a {
  color: unset;
}

.loop-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 360px));
  grid-gap: 1em;
  justify-content: center;


  /* margin-top: 1em; */
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
