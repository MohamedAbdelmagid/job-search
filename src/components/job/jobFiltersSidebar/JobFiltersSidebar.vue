<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" variant="secondary" />
        </div>
      </div>
      <JobFilter
        header="Job Types"
        :values="jobTypes"
        :action="jobStore.setSelectedJobTypes"
      />
      <JobFilter
        header="Organizations"
        :values="organizations"
        :action="jobStore.setSelectedOrgs"
      />
    </section>
  </div>
</template>

<script setup>
import ActionButton from "@/components/shared/ActionButton.vue";
import JobFilter from "@/components/job/jobFiltersSidebar/JobFilter.vue";

import { computed } from "vue";
import { useJobStore } from "@/stores/job";

const jobStore = useJobStore();

const jobTypes = computed(() => jobStore.jobTypes);
const organizations = computed(() => jobStore.organizations);
</script>
