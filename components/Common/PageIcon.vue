<template>
  <div
    :class="{ 'page-icon': !isEnabled, 'page-icon-disabled': !isEnabled }"
  >
    <FontAwesomeIcon
      :icon="faIcon"
      class="page-fa-icon"
    />
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'PageIcon',
  components: {
    FontAwesomeIcon,
  },
  props: {
    isEnabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    direction: {
      type: String,
      required: true,
      default: 'left',
      validator(val) {
        return val === 'left' || val === 'right';
      },
    },
  },
  computed: {
    faIcon() {
      if (this.direction === 'left') {
        return 'chevron-left';
      }
      return 'chevron-right';
    },
  },

};
</script>

<style scoped lang="postcss">
.page-icon {
  background-color: #f0f0f0;
  padding: .5em 2em;
  border-radius: 5px;
  text-align: center;
  color: #888888;

  flex: 2 2 auto;
}

.page-icon-disabled {
  color: #dddddd;
}
</style>
