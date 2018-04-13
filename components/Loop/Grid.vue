<template>
  <div
    v-if="pageType === 'home'"
    class="LoopGrid"
  >
    <div
      v-for="loop in loopList"
      :key="loop"
      class="LoopGrid-child"
    >
      <nuxt-link :to="{ name: 'loop-id', params: { id: loop }}">
        <LoopCard
          :loopid="loop"
          loop-type="gif"
          page-type="home"
        />
        <CardDetails
          :loopid="loop"
          class="z-1"
          type="loop"
        />
      </nuxt-link>
    </div>
  </div>
  <div
    v-else
    class="LoopGrid"
  >
    <div
      v-for="loop in loopList"
      :key="loop.id"
      class="LoopGrid-child"
    >
      <nuxt-link :to="{ name: 'loop-id', params: { id: loop.id }}">
        <LoopCard
          :loopid="loop.id"
          page-type="episode"
          loop-type="gif"
        />
        <CardDetails
          :loopid="loop.id"
          class="z-1"
          type="episode"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import LoopCard from './Card';
import CardDetails from './CardDetails';

/**
 * Grid layout wrapper for `LoopCard`.
 */
export default {
  name: 'LoopGrid',
  components: {
    LoopCard,
    CardDetails,
  },
  props: {
    /**
     * The type of page including this component.
     *
     * `home, episode`
     */
    pageType: {
      type: String,
      required: true,
      default: 'home',
      validator(val) {
        return val === 'home' || val === 'episode';
      },
    },
    /**
     * `episodeid` of the Episode, when `pageType` is `episode`.
     */
    episodeid: {
      type: String,
      required: false,
      default: '',
      validator(val) {
        return /^[a-z0-9]{24}$/.test(val) || val === '';
      },
    },
  },
  computed: {
    loopList() {
      if (this.pageType === 'episode') {
        return this.$store.state.loop.loopList[this.episodeid];
      } else if (this.pageType === 'home') {
        return this.$store.state.loop.randomLoopList;
      }
      return [];
    },
  },

};

</script>

<style scoped lang="postcss">
/** @define LoopGrid */

.LoopGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 360px));
  grid-template-rows: auto;
  grid-gap: 1em;
  justify-content: center;

  /* background-color: rgba(224, 224, 224, 0.2); */

  /* margin-top: 1em; */
  & a {
    color: black;
  }
}

.LoopGrid-child {
  display: flex;
  flex-flow: column nowrap;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

</style>
