<template>
  <section>
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />for everyone
    </h1>
    <h1 class="text-3xl font-light">Find your next job at Softbanks Corp.</h1>
  </section>
</template>

<script>
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
        build: this.action === "Build",
        create: this.action === "Create",
        design: this.action === "Design",
        code: this.action === "Code",
      };
    },
  },
  created() {
    this.interval = setInterval(() => {
      const actions = ["Build", "Create", "Design", "Code"];
      const index = actions.indexOf(this.action);
      this.action = actions[(index + 1) % 4];
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
