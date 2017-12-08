<template>
  <nav class="breadcrumb-wrapper">
    <span class="breadcrumb-link"><slot name="title"></slot></span>
    <span class="breadcrumb-divider">/</span>
    <span class="breadcrumb-link"><slot name="no"></slot></span>
  </nav>
</template>

<script>
export default {
  name: 'breadcrumb',
};
</script>

<style lang="postcss">
.breadcrumb-wrapper {
  /*hack for overflow ellipsis*/
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  /*text-overflow: ellipsis;*/

  /*hack for ellipsis color*/
  color: rgba(21, 81, 166, 0.5);
}

.breadcrumb-link {
  /*hack for alignment after overflow: hidden*/
  vertical-align: top;

  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: calc(100% - 3em);

  & a {
    color: #1e50a2;
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
