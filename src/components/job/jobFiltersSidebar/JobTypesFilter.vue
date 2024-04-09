<template>
  <collapsible-accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="jobType in jobTypes" :key="jobType" class="h-8 w-1/2">
            <input
              :id="jobType"
              :value="jobType"
              v-model="selectedJobTypes"
              @change="updateSelectedJobTypes"
              type="checkbox"
              class="mr-3"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";

import { computed, ref } from "vue";
import { useJobStore } from "@/stores/job";
import { useRouter } from "vue-router";

const selectedJobTypes = ref([]);

const jobStore = useJobStore();
const jobTypes = computed(() => jobStore.jobTypes);

const router = useRouter();
const updateSelectedJobTypes = () => {
  jobStore.setSelectedJobTypes(selectedJobTypes.value);
  router.push({ name: "JobResults" });
};
</script>
