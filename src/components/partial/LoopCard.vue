<template>
  <section @mouseover="onHovered()" @mouseout="onUnhovered()">
    <a class="">
      <img v-if="!hovered || !showVid" class="video-cover" width="100%" :class="{ blur: !canplaythrough && hovered }" :src="imgUri['360p']" :srcset="imgSrcSet">
        <div v-cloak class="video-container" v-if="hovered">
          <video loop muted autoplay width="100%" v-if="hovered" v-show="showVid" :src="videoUri['360p']" @canplaythrough.once="canplay()"></video>
        </div>
    </a>
  </section>
</template>

<script>
export default {
  name: 'loop-card',
  props: ['imgUri', 'videoUri'],
  data() {
    return {
      hovered: false,
      canplaythrough: false,
      showVid: false,
    };
  },
  methods: {
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
        setTimeout(function () {
          console.log('setting timeout');
          this.showVid = true;
        }, 0);
      }
      // return this.vidLoaded;
    },
    // test() {
    //   console.log(this.$el);
    // },
  },
  computed: {
    imgSrcSet() {
      return `"${this.imgUri['360p']},
      ${this.imgUri['720p']} 2x, ${this.imgUri['1080p']} 3x`;
    },
  },
  mounted() {
    // const el = document.querySelectorAll('p');
    // el.forEach(e => e.addEventListener('click', this.test, false));
  },
  // render(createElement) {
  //   function hoverVideo(hovered, videoUri, imgUri, imgSrcSet) {
  //     if (hovered) {
  //       console.log('hovered');
  //       return createElement('div', {
  //         attrs: {
  //           class: 'v_i',
  //         },
  //       }, [
  //         createElement('img', {
  //           style: {
  //             display: 'none',
  //           },
  //           attrs: {
  //             class: 'video-cover',
  //             src: imgUri['360p'],
  //             srcset: imgSrcSet,
  //           },
  //         }),
  //         createElement('div', {
  //           attrs: {
  //             class: 'video-container',
  //           }
  //         }, [
  //           createElement('video', {
  //             style: {
  //               width: '100%',
  //             },
  //             attrs: {
  //               loop: true,
  //               muted: true,
  //               autoplay: true,
  //               src: videoUri['360p'],
  //             },
  //           }),
  //         ]),
  //       ]);
  //     }
  //     console.log('unhovered');
  //     return createElement('div', {
  //       attrs: {
  //         class: 'v-i',
  //       }
  //     }, [
  //       createElement('img', {
  //         attrs: {
  //           class: 'video-cover',
  //           src: imgUri['360p'],
  //           srcset: imgSrcSet,
  //         },
  //       }),
  //       createElement('div', {
  //         style: {
  //           display: 'none',
  //         },
  //         attrs: {
  //           class: 'video-container',
  //         },
  //       }),
  //     ]);
  //   }
  //
  //   return createElement('div', {
  //     on: {
  //       mouseover: () => {
  //         // this.hovered = true;
  //         // console.log('hovered');
  //       },
  //       mouseout: () => {
  //         // this.hovered = false;
  //         // console.log('unhovered');
  //       },
  //     },
  //     attrs: {
  //       class: 'loop-card',
  //     },
  //   }, [
  //     hoverVideo(this.hovered, this.videoUri, this.imgUri, this.imgSrcSet),
  //     createElement('p', {
  //       on: {
  //         mouseover: () => {
  //           this.hovered = true;
  //           // console.log('hovered');
  //         },
  //         mouseout: () => {
  //           this.hovered = false;
  //           // console.log('unhovered');
  //         },
  //       },
  //     }, 'hoverMe'),
  //   ]);
  // },
};
</script>

<style scoped>
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
