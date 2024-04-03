<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="text-brand-green-1"> {{ jobsByOrgs.length }}</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useJobStore } from "@/stores/job";

export default {
  name: "SubNav",
  computed: {
    ...mapState(useJobStore, ["jobsByOrgs"]),

    onJobResultsPage() {
      return this.$route.name === "JobResults";
    },
  },
};
</script>
