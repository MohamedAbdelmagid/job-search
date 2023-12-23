<template>
  <div class="flex flex-row">
    <JobFiltersSidebar />
    <JobListings />
  </div>
</template>

<script>
import JobFiltersSidebar from "@/components/job/JobFiltersSidebar.vue";
import JobListings from "@/components/job/JobListings.vue";

export default {
  name: "JobResultsView",
  components: {
    JobFiltersSidebar,
    JobListings,
  },
};
</script>
