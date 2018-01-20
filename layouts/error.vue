<template>
  <div class="container">
    <div v-if="error.statusCode === 404">
      <img
        src="~/assets/images/transparent_akkarin.jpg"
        alt="Akkarin not found image"
      >
      <p class="img-link">(Credit: <a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=22876424">はらぺこ@仕事につきROM専</a>)</p>
      <h1>404 Page not found</h1>
    </div>
    <div v-else>
      <h1>An error occured</h1>
      <!-- <pre>{{ JSON.Stringify(error) }}</pre> -->
      <pre>{{ error.statusCode }}</pre>
    </div>
    <pre>{{ error.message }}</pre>
    <!-- <nuxt-link to="/">Home page</nuxt-link> -->
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
    };
  },
  computed: {
    errorStrings() { return JSON.stringify(this.error) },
  },
};
</script>

<style scoped>
.container {
  font-family: sans-serif;
  text-align: center;
  /* height: 100vw; */
}

.img-link {
  & a {
    color: royalblue;
    text-decoration: underline;
  }
  margin-bottom: 1em;
}

h1 {
  font-size: 20px;
}

img {
  margin-bottom: 1em;
}
</style>
