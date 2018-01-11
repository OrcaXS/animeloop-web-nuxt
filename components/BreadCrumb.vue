<template>
  <nav class="breadcrumb-wrapper">
    <span class="breadcrumb-link title"><slot name="title"></slot></span>
    <span class="breadcrumb-divider">/</span>
    <span class="breadcrumb-link"><slot name="no"></slot></span>
  </nav>
</template>

<script>
export default {
  name: 'breadcrumb',
};
</script>

<style scoped lang="postcss">
.breadcrumb-wrapper {
  display: inline-flex;
  align-items: center;

  /*hack for overflow ellipsis*/
  white-space: nowrap;
  overflow: hidden;
  /*text-overflow: ellipsis;*/

  /*hack for ellipsis color*/
  color: rgba(21, 81, 166, 0.5);

  /* hack for i18n alignment */
  line-height: 1.15;

}

.breadcrumb-link {
  /* vertical-align: baseline; */
  display: inline-block;
  max-width: calc(100% - 3em);

  & a {
    color: #1e50a2;
  }

  &.title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

/*.breadcrumb-link-id {
  & a {
    color: rgba(21, 81, 166, 0.5);
  }
}*/

.breadcrumb-divider {
  display: inline-block;
  color: #95989A;
  padding: 0em .5rem;
}

</style>
