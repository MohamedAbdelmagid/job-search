<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="text-brand-green-1"> {{ filteredJobs.length }}</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useJobStore } from "@/stores/job";

const route = useRoute();
const onJobResultsPage = computed(() => route.name === "JobResults");

const jobStore = useJobStore();
const filteredJobs = computed(() => jobStore.filteredJobs);
</script>
