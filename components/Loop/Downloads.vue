<template>
  <div class="downloads-wrapper tag">
    <div
      v-for="entry in downloadEntries"
      :key="entry.name"
      :class="entry.typeClass"
      class="download-tag"
    >
      <a
        :href="entry.url"
        download
      >{{ entry.name }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Downloads',
  props: {
    loopid: {
      type: String,
      required: true,
      validator(value) {
        return /^[a-z0-9]{24}$/.test(value);
      },
    },
  },

  computed: {
    files() {
      return this.$store.state.loop.loops[this.loopid].files;
    },
    downloadEntries() {
      return [
        { name: 'gif_180p', url: this.files.gif_360p, typeClass: 'gif-tag' },
        { name: 'jpg_360p', url: this.files.jpg_360p, typeClass: '' },
        { name: 'jpg_720p', url: this.files.jpg_720p, typeClass: '' },
        { name: 'jpg_1080p', url: this.files.jpg_1080p, typeClass: '' },
        { name: 'mp4_360p', url: this.files.mp4_360p, typeClass: 'video-tag' },
        { name: 'mp4_720p', url: this.files.mp4_720p, typeClass: 'video-tag' },
        { name: 'mp4_1080p', url: this.files.mp4_1080p, typeClass: 'video-tag' },
      ];
    },
  },
};
</script>

<style scoped>
.downloads-wrapper {
  margin-top: -.4em;
  margin-left: -.2em;

  display: flex;
  flex-flow: row wrap;

}

.download-tag {
  /* font-family: monospace; */
  display: flex;
  align-items: center;
  text-align: center;

  height: 1.5em;
  margin: .25em;
  padding: .25em .75em;
  font-size: .9em;

  background-color: #3B71C7;
  & > a {
    color: white;
  }

  border-radius: 2px;

  white-space: nowrap;
}

.video-tag {
  background-color: #1E50A2;
}

.gif-tag {
  background-color: #6096EC;
}

</style>
