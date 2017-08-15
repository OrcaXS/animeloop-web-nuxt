<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'loop-card',
  data() {
    return {
    };
  },
  methods: {
    // test() {
    //   console.log(this.$el);
    // },
  },
  mounted() {
    // const el = document.querySelectorAll('p');
    // el.forEach(e => e.addEventListener('click', this.test, false));
  },
};

</script>
