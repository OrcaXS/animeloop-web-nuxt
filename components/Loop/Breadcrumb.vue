<template>
  <nav class="Breadcrumb-wrapper">
    <span class="Breadcrumb-link Breadcrumb-title">
      <slot name="title" />
    </span>
    <span class="Breadcrumb-divider">
      /
    </span>
    <span class="Breadcrumb-link">
      <slot name="no" />
    </span>
  </nav>
</template>

<script>
/**
 * Breadcrumb Component for Loop Pages.
 */
export default {
  name: 'Breadcrumb',
};
</script>

<style scoped lang="postcss">
/** @define Breadcrumb */

.Breadcrumb-wrapper {
  display: inline-flex;
  align-items: center;

  /*hack for overflow ellipsis*/
  white-space: nowrap;
  overflow: hidden;
  /*text-overflow: ellipsis;*/

  /*hack for ellipsis color*/
  color: rgba(21, 81, 166, 0.5);
}

.Breadcrumb-link {
  display: inline-block;
  max-width: calc(100% - 3em);

  & > a {
    color: #1e50a2;
  }
}

.Breadcrumb-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.Breadcrumb-divider {
  display: inline-block;
  color: #95989A;
  padding: 0em .5rem;
}

</style>
