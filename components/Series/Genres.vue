<template>
  <div class="genres">
    <span v-for="(genre, index) in genres" v-if="index === 0">
      {{ genre }}
    </span>
    <span v-else>
      / {{ genre }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Genres',
  props: {
    genres: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.genres {
  color: #444444;
  font-style: italic;
  font-size : 0.9em;
}
</style>
