<template>
  <div class="home-container">
      <router-view/>
      <Navigation/>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import Navigation from '@/components/Navigation.vue';

export default {
  components: {
    Navigation,
  },
};
</script>

<style>

</style>
