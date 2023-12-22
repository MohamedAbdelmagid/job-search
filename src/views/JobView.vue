<template>
  <div>Job Page {{ jobID }}</div>
</template>

<script>
export default {
  name: "JobView",
  computed: {
    jobID() {
      return this.$route.params.id
    }
  }
}
</script>