<template>
  <div class="SeriesGenres">
    <template
      v-for="(genre, index) in existingGenres"
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
  name: 'SeriesGenres',
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
  computed: {
    existingGenres() {
      return this.genres.filter(genre => !!genre);
    },
  },
};
</script>

<style scoped>
/** @define SereisGenres */

.SeriesGenres {
  color: #444444;
  font-style: italic;
  font-size : 0.9em;
}
</style>
