<template>
  <div class="NavbarTitle-logoLink">
    <nuxt-link :to="'/'">
      <img
        class="NavbarTitle-logo"
        alt="Animeloop Logo"
        src="~@/assets/images/anime-loop-logo.svg"
      >
      <!-- `~@`: Webpack path hack for styleguidist -->
    </nuxt-link>
    <button
      class="NavbarTitle-playBtn"
      aria-label="Play or Pause button"
      @click="togglePlay"
    >
      <FontAwesomeIcon
        v-show="showPlayIcon"
        :icon="playIcon"
      />
    </button>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

/**
 * Title on the Navbar.
 */
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
/** @define NavbarTitle */
@import "~/assets/css/mediaqueries.css";

.NavbarTitle-logo {
  font-size: 1.2em;
  display: block;
  height: 1.6em;
}

.NavbarTitle-logoLink {
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

.NavbarTitle-playBtn {
  border: none;
  outline: none;
  background: transparent;
  margin: -.5em -.5em -.5em -.2em;
  padding: .5em;
  cursor: pointer;

  font-size: 1.2em;
}

</style>
