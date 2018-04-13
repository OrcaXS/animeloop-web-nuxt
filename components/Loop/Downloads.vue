<template>
  <div class="Downloads-wrapper font-opensans">
    <div
      v-for="entry in downloadEntries"
      :key="entry.name"
      :class="entry.typeClass"
      class="Downloads-tag"
    >
      <a
        :href="entry.url"
        class="text-white"
        download
      >{{ entry.name }}</a>
    </div>
  </div>
</template>

<script>
/**
 * Download section of Loop Page.
 */
export default {
  name: 'Downloads',
  props: {
    /**
    * `loopid` of the `LoopCard`.
    */
    loopid: {
      type: String,
      required: true,
      validator(val) {
        return /^[a-z0-9]{24}$/.test(val);
      },
    },
  },

  computed: {
    files() {
      return this.$store.state.loop.loops[this.loopid].files;
    },
    downloadEntries() {
      return [
        { name: 'gif_180p', url: this.files.gif_360p, typeClass: 'Downloads-gif' },
        { name: 'jpg_360p', url: this.files.jpg_360p, typeClass: '' },
        { name: 'jpg_720p', url: this.files.jpg_720p, typeClass: '' },
        { name: 'jpg_1080p', url: this.files.jpg_1080p, typeClass: '' },
        { name: 'mp4_360p', url: this.files.mp4_360p, typeClass: 'Downloads-video' },
        { name: 'mp4_720p', url: this.files.mp4_720p, typeClass: 'Downloads-video' },
        { name: 'mp4_1080p', url: this.files.mp4_1080p, typeClass: 'Downloads-video' },
      ];
    },
  },
};
</script>

<style scoped lang="postcss">
/** @define Downloads */
.Downloads-wrapper {
  margin-top: -.4em;
  margin-left: -.2em;

  display: flex;
  flex-flow: row wrap;
}

.Downloads-tag {
  display: flex;
  align-items: center;
  text-align: center;

  height: 1.5em;
  margin: .25em;
  padding: .25em .75em;
  font-size: .9em;

  background-color: #3B71C7;

  border-radius: 2px;

  white-space: nowrap;
}

.Downloads-video {
  background-color: #1E50A2;
}

.Downloads-gif {
  background-color: #6096EC;
}

</style>
