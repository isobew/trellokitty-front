<template>
  <Sidebar v-if="$route.meta.requiresAuth" />
  <router-view />
</template>

<script lang="ts">
  import Sidebar from './components/Sidebar.vue';

  export default {
    name: "App",
    components: { Sidebar },
  };
</script>
