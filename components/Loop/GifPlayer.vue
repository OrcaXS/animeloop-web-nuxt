<template>
  <div class="gif-player-container">
    <img
      alt="Static Loop Image"
      v-cloak
      v-if="playState"
      v-show="gifLoaded"
      class="gif"
      :src="gifsrc"
      @load="imageOnload"
    >
    <img
      alt="Animated Loop Image"
      v-if="!gifLoaded || !playState"
      :src="jpgsrc"
      :class="{ blur: playState }"
    >
  </div>
</template>

<script>
export default {
  name: 'GifPlayer',
  props: {
    jpgsrc: {
      type: String,
      required: true,
    },
    gifsrc: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      gifLoaded: false,
    };
  },
  computed: {
    playState() {
      return this.$store.state.loop.play;
    },
  },
  methods: {
    imageOnload() {
      this.gifLoaded = true;
    },
  },

};
</script>

<style scoped lang="postcss">
.gif-player-container {
  display: flex;
  position: relative;
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
  border-radius: 3px 3px 0 0;
  /* object-fit: contain; */


  & img {
    transition: all 0.5s;
    object-fit: contain;
    margin-left: auto;
    margin-right: auto;
  }

  & .gif {
    /* gif size hack */
    width: 360px;
    height: 100%;
  }
}

.blur {
  filter: blur(20px);
}

[v-cloak] {
  display: none;
}

</style>
