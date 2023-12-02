<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />for everyone
    </h1>
    <h1 class="text-3xl font-light">Find your next job at Softbanks Corp.</h1>
  </section>
</template>

<script>
import getNextElement from "@/utils/nextElementInList";
export default {
  name: "HeadLine",
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },
  computed: {
    actionClasses() {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
  },
  created() {
    this.interval = setInterval(() => {
      const actions = ["Build", "Create", "Design", "Code"];
      this.action = getNextElement(actions, this.action);
    }, 3000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #f8ab00;
}
.code {
  color: #d93025;
}
</style>
