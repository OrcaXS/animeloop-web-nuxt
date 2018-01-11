<template>
  <nuxt-link class="logo-link" :to="'/'">
    <img class="logo" alt="Animeloop" src="~/assets/images/anime-loop-logo.svg" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'NavbarTitle',
};
</script>

<style scoped lang="postcss">
@import "../../assets/css/mediaquery.css";

.logo {
  font-size: 1.2em;
  display: block;
  height: 1.6em;
}

.logo-link {
  display: flex;
  align-items: center;
  cursor: pointer;


  @media (--phone-screen) {
    /* display: block; */
    /* position: absolute; */
    /* transform: translate(-50%, -50%); */
    /* top: 50%; */
    /* left: 50%; */
    /* flex: 0 1 33%; */
    margin: auto;
    justify-content: center;
  }
}
</style>
