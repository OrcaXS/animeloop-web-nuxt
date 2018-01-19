<template>
  <div v-if="pageType === 'random'" class="loop-grid-container">
    <div class="loop-card-flex-container" v-for="loop in loopList" :key="loop">
      <nuxt-link :to="{ name: 'loop-id', params: { id: loop }}">
        <LoopCard
        class="loop-card"
        :loopid="loop"
        loopType="gif"
        pageType="random"
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
        loopType="gif"
        :pageType="pageType"
        />
        <CardDetails
        class="card-detail"
        :loopid="loop.id"
        type="episode"
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
    pageType: {
      type: String,
      required: true,
      default: 'mp4',
      validator(val) {
        return val === 'random' || val === 'episode';
      },
    },
    episodeid: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    loopList() {
      if (this.pageType === 'episode') {
        return this.$store.state.loop.loopList[this.episodeid];
      } else if (this.pageType === 'random') {
        return this.$store.state.loop.randomLoopList;
      }
      return [];
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
  grid-template-rows: auto;
  grid-gap: 1em;
  justify-content: center;

  /* background-color: rgba(224, 224, 224, 0.2); */

  /* margin-top: 1em; */
}

.loop-card-flex-container {
  display: flex;
  flex-flow: column nowrap;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.loop-card {
  z-index: 1;
}

.card-detail {
  z-index: 2;
}


</style>
