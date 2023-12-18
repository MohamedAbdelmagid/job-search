<template>
  <MainNav />
  <router-view />
</template>

<script>
import MainNav from "@/components/nav/MainNav.vue";

export default {
  name: "JobSearchApp",
  components: {
    MainNav,
  },
};
</script>
