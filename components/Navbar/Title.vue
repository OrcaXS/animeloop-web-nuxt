<template>
  <div class="logo-link">
    <nuxt-link :to="'/'">
      <img class="logo" alt="Animeloop" src="~/assets/images/anime-loop-logo.svg" />
    </nuxt-link>
    <font-awesome-icon
      class="fa-icon"
      v-show="showPlayIcon"
      :icon="playIcon"
      @click="togglePlay"
    />
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'NavbarTitle',
  components: {
    FontAwesomeIcon,
  },
  methods: {
    togglePlay() {
      const isPlaying = this.playState;
      this.$store.dispatch('setPlay', { play: !isPlaying });
    },
  },
  computed: {
    playState() {
      return this.$store.state.loop.play;
    },
    playIcon() {
      return (this.playState) ? 'pause' : 'play';
    },
    showPlayIcon() {
      return (this.$route.name === 'episode-id' || this.$route.name === 'index');
    },
  },
};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

.logo {
  font-size: 1.2em;
  display: block;
  height: 1.6em;
}

.logo-link {
  display: flex;
  align-items: center;
  cursor: pointer;


  @media (--phone-screen) {
    /* display: block; */
    /* position: absolute; */
    /* transform: translate(-50%, -50%); */
    /* top: 50%; */
    /* left: 50%; */
    flex: 0 1 calc(100% / 3);
    /* margin: auto; */
    justify-content: center;
  }
}

.fa-icon {
  margin-left: .2em;
}
</style>
