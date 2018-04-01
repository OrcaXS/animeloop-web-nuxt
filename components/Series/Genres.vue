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
/**
 * Iterates and displays genres from array.
 */
export default {
  name: 'Genres',
  props: {
    /**
     * The array containing genres.
     */
    genres: {
      type: Array,
      required: true,
      default: () => ['Unknown Genre'],
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
