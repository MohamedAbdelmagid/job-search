<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
      />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from "./JobListing.vue";
import axios from 'axios';

export default {
  name: "JobListings",
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || 1)
    },
    displayedJobs() {
      const firstIndex = (this.currentPage - 1) * 10
      const lastIndex = this.currentPage * 10
      return this.jobs.slice(firstIndex, lastIndex)
    }
  },
  methods: {
    async fetchJobs() {
      const response = await axios.get("http://localhost:3000/jobs");
      this.jobs = await response.data;
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
