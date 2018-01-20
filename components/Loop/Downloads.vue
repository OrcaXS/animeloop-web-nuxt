<template>
  <section class="downloads-wrapper">
    <a
      class="download-tag gif-tag"
      :href="files.gif_360p"
      download=""
    >gif_180p</a>
    <a
      class="download-tag"
      :href="files.jpg_360p"
      download=""
    >jpg_360p</a>
    <a
      class="download-tag"
      :href="files.jpg_720p"
      download=""
    >jpg_720p</a>
    <a
      class="download-tag"
      :href="files.jpg_1080p"
      download=""
    >jpg_1080p</a>
    <a
      class="download-tag video-tag"
      :href="files.mp4_360p"
      download=""
    >mp4_360p</a>
    <a
      class="download-tag video-tag"
      :href="files.mp4_720p"
      download=""
    >mp4_720p</a>
    <a
      class="download-tag video-tag"
      :href="files.mp4_1080p"
      download=""
    >mp4_1080p</a>
  </section>
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
  },
};
</script>

<style>
.downloads-wrapper {
  margin-top: -.4em;
  margin-left: -.2em;

  display: flex;
  flex-flow: row wrap;
}

.download-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lato', sans-serif;

  height: 1.5em;
  margin: .25em;
  padding: .25em .75em;
  font-size: .9em;

  background-color: #3B71C7;
  /* !important hack */
  color: white !important;
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
