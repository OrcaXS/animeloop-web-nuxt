<template>
  <div class="logo-link">
    <nuxt-link :to="'/'">
      <img
        class="logo"
        alt="Animeloop Logo"
        src="~/assets/images/anime-loop-logo.svg"
      >
    </nuxt-link>
    <button
      class="play-button"
      @click="togglePlay"
      aria-label="Play or Pause button"
    >
      <FontAwesomeIcon
        class="fa-icon"
        v-show="showPlayIcon"
        :icon="playIcon"
      />
    </button>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'NavbarTitle',
  components: {
    FontAwesomeIcon,
  },
  computed: {
    playState() {
      return this.$store.state.loop.play;
    },
    playIcon() {
      return (this.playState) ? 'pause-circle' : 'play-circle';
    },
    showPlayIcon() {
      return (this.$route.name === 'episode-id' || this.$route.name === 'index');
    },
  },
  methods: {
    togglePlay() {
      const isPlaying = this.playState;
      this.$store.dispatch('setPlay', { play: !isPlaying });
    },
  },

};
</script>

<style scoped lang="postcss">
@import "~/assets/css/mediaquery.css";

.logo {
  font-size: 1.2em;
  display: block;
  height: 1.6em;
}

.logo-link {
  display: flex;
  /* align-items: center; */
  cursor: pointer;


  @media (--phone-screen) {
    /* display: block; */
    /* position: absolute; */
    /* transform: translate(-50%, -50%); */
    /* top: 50%; */
    /* left: 50%; */
    flex: 0 1 50%;
    /* margin: auto; */
    justify-content: center;
  }
}

.play-button {
  border: none;
  outline: none;
  background: transparent;
  margin: -.5em -.5em -.5em -.2em;
  padding: .5em;
  cursor: pointer;

  font-size: 1.2em;
}

.fa-icon {
  /* margin-left: .2em; */
}
</style>
