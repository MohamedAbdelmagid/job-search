<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing
        v-for="job in jobs"
        :key="job.id"
        :job="job"
      />
    </ol>
  </main>
</template>

<script>
import JobListing from "./JobListing.vue";

export default {
  name: "JobListings",
  data() {
    return {
      jobs: [],
    };
  },
  methods: {
    async fetchJobs() {
      const response = await fetch("http://localhost:3000/jobs");
      this.jobs = await response.json();
    },
  },
  created() {
    this.fetchJobs();
  },
  components: {
    JobListing,
  },
};
</script>
