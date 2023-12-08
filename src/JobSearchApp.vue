<template>
  <MainNav />
  <Content />
</template>

<script>
import MainNav from "@/components/nav/MainNav.vue";
import Content from "@/components/Content.vue";

export default {
  name: "JobSearchApp",
  components: {
    MainNav,
    Content,
  },
};
</script>
