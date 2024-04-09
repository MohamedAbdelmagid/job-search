<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="org in organizations" :key="org" class="h-8 w-1/2">
            <input
              :id="org"
              :value="org"
              v-model="selectedOrgs"
              @change="updateSelectedOrgs"
              type="checkbox"
              class="mr-3"
            />
            <label :for="org">{{ org }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";

import { useJobStore } from "@/stores/job";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const selectedOrgs = ref([]);

const jobStore = useJobStore();
const organizations = computed(() => jobStore.organizations);

const router = useRouter();
const updateSelectedOrgs = () => {
  jobStore.setSelectedOrgs(selectedOrgs.value);
  router.push({ name: "JobResults" });
};
</script>
