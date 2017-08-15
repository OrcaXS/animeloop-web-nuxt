<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        Animeloop
      </a>
      <div class="navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu navbar-end">
      <div class="navbar-item has-dropdown">
        <a class="navbar-link">
          Language
        </a>
      </div>
      <div class="navbar-dropdown">
        <a class="navbar-item" href="#">English</a>
        <a class="navbar-item" href="#">Français</a>
        <a class="navbar-item" href="#">日本語</a>
        <a class="navbar-item" href="#">中文</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  padding-left: 2em;
  padding-right: 2em;
  /*height: 3.25em;*/
  /*width: 100%;*/
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

@media (width <= 1000px) {
  .navbar {
    padding: 0em;
  }
}

</style>
