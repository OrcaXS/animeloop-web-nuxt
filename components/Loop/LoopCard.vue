<template>
  <section
    @mouseover="onHovered()"
    @mouseout="onUnhovered()"
  >
    <div v-if="!this.canplaythrough">
      <!-- <icon name="circle-o-notch" spin></icon> -->
      <span>Loading video...</span>
    </div>
    <div class="video-container">
      <video
      ref="video"
      loop
      muted
      playsInline
      width="100%"
      :src="files.mp4_360p"
      @canplaythrough.once="canplay"
      >
        <track label="English" kind="captions" srcLang="en" />
      </video>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoopCard',
  props: ['loopid'],
  data() {
    return {
      hovered: false,
      canplaythrough: false,
      isVideoLoaded: false,
    };
  },
  computed: {
    files() {
      return this.$store.state.loop.loops[this.loopid].files;
    },
  },
  methods: {
    // videoLoaded() {
    //   console.log('imgLoaded');
    //   this.isVideoLoaded = true;
    // },
    onHovered() {
      // console.log('hovered');
      if (!this.hovered) {
        this.hovered = true;
        this.$refs.video.play();
      }
    },
    onUnhovered() {
      // console.log('unhovered');
      this.hovered = false;
      this.$refs.video.pause();
    },
    canplay() {
      console.log('canplaythrough');
      this.canplaythrough = true;
      // this.showVid = true;
    },
  },
};
</script>

<style scoped>
section {
  line-height: 0;
}

[v-cloak] {
  display: none;
}

.video-container {
  /*width: 50vw;*/
  /*display: flex;*/
  object-fit: cover;
  /* width: 100%; */

  /* proportional hack */
  height: 0;
  padding-bottom: 56.25%;

  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}

.video-cover {
  /*display: inline-block;*/
  /*background-size: cover;*/
  width: 100%;
  transition: all 0.5s;
}

.blur {
  filter: blur(10px);
}
</style>
