<template>
  <div
    :class="{ PageIcon: !isEnabled, 'PageIcon--disabled': !isEnabled }"
  >
    <FontAwesomeIcon
      :icon="faIcon"
      class="page-fa-icon"
    />
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

/**
 * Icon Component for Pagination Buttons.
 */
export default {
  name: 'PageIcon',
  components: {
    FontAwesomeIcon,
  },
  props: {
    /**
     * The status of the button.
     */
    isEnabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    /**
     * The direction of the arrow icon.
     */
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
/** @define PageIcon */

.PageIcon {
  background-color: #f0f0f0;
  padding: .5em 2em;
  border-radius: 5px;
  text-align: center;
  color: #888888;

  flex: 2 2 auto;
}

.PageIcon--disabled {
  color: #dddddd;
}
</style>
