<template>
  <div class="genres">
    <template
      v-for="(genre, index) in genres"
      v-if="!!genre"
    >
      <span
        v-if="index === 0"
        :key="index"
      >
        {{ genre }}
      </span>
      <span
        v-else
        :key="index"
      >
        / {{ genre }}
      </span>
    </template>
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
