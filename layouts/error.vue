<template>
  <div
    class="error-container"
    lang="en"
  >
    <div v-if="error.statusCode === 404">
      <img
        src="~/assets/images/transparent_akkarin.jpg"
        alt="Akkarin not found image"
      >
      <p class="img-link">(Credit: <a
        href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=22876424"
        lang="ja"
      >はらぺこ@仕事につきROM専</a>)</p>
      <h1>404 Page not found</h1>
    </div>
    <div v-else>
      <h1>An error occured</h1>
      <pre>{{ error.statusCode }}</pre>
    </div>
    <div class="error-message">
      <pre>{{ error.message }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: 'Error | Animeloop',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Error | Animeloop Beta' },
        { hid: 'og:description', property: 'og:description', content: 'Animeloop Beta Error Page' },
      ],
    };
  },
  computed: {
    errorStrings() { return JSON.stringify(this.error) },
  },
};
</script>

<style scoped>
.error-container {
  font-family: sans-serif;
  text-align: center;
  max-width: 100%;
  /* height: 100vw; */
}

.img-link {
  & a {
    color: royalblue;
    text-decoration: underline;
  }
  margin-bottom: 1em;
}

.error-message {
  max-width: 100%;
}

h1 {
  font-size: 20px;
}

img {
  max-width: 100%;
  margin-bottom: 1em;
}

pre {
  white-space: pre-wrap;
}
</style>
