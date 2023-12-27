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

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from "./JobListing.vue";
import axios from "axios";

export default {
  name: "JobListings",
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || 1);
    },
    previousPage() {
      const page = this.currentPage - 1;
      return page >= 1 ? page : undefined;
    },
    nextPage() {
      const page = this.currentPage + 1;
      const numbersOfPages = Math.ceil(this.jobs.length / 10);
      return page <= numbersOfPages ? page : undefined;
    },
    displayedJobs() {
      const firstIndex = (this.currentPage - 1) * 10;
      const lastIndex = this.currentPage * 10;
      return this.jobs.slice(firstIndex, lastIndex);
    },
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
