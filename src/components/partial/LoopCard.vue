<template>
  <section
    @mouseover="onHovered()"
    @mouseout="onUnhovered()"
  >
      <section v-if="!isImgLoaded">
        <icon name="circle-o-notch" spin></icon>
        <span>Loading cover...</span>
      </section>
      <img
        v-if="!hovered || !showVid"
        class="video-cover"
        width="100%"
        :class="{ blur: !canplaythrough && hovered }"
        :src="imgUri['jpg_360p']"
        :srcset="imgSrcSet"
        @load="imgLoaded()"
      >
      <div
        v-cloak
        class="video-container"
        v-if="hovered"
      >
        <video loop muted autoplay
          width="100%"
          v-if="hovered"
          v-show="showVid"
          :src="videoUri['mp4_360p']"
          @canplaythrough.once="canplay()"
        ></video>
      </div>
  </section>
</template>

<script>
export default {
  name: 'LoopCard',
  props: {
    imgUri: {
      type: Object,
      required: true,
    },
    videoUri: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hovered: false,
      canplaythrough: false,
      showVid: false,
      isImgLoaded: false,
    };
  },
  computed: {
    imgSrcSet() {
      return `"${this.imgUri.jpg_360p},
      ${this.imgUri.jpg_720p} 2x, ${this.imgUri.jpg_1080p} 3x`;
    },
  },
  methods: {
    imgLoaded() {
      console.log('imgLoaded');
      this.isImgLoaded = true;
    },
    onHovered() {
      console.log('hovered');
      if (!this.hovered) {
        this.hovered = true;
        this.vidLoaded();
      }
    },
    onUnhovered() {
      console.log('unhovered');
      this.hovered = false;
      this.showVid = false;
    },
    canplay() {
      // console.log('canplaythrough');
      this.canplaythrough = true;
      this.showVid = true;
    },
    vidLoaded() {
      if (this.showVid) {
        this.showVid = false;
        setTimeout(() => {
          console.log('setting timeout');
          this.showVid = true;
        }, 0);
      }
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
  object-fit: cover;
  width: 100%;
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
