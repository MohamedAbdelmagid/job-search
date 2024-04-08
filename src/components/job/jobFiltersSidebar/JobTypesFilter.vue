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

<script>
import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";
import { mapState, mapActions } from "pinia";
import { useJobStore } from "@/stores/job";

export default {
  name: "JobTypesFilter",
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapState(useJobStore, ["jobTypes"]),
  },
  methods: {
    ...mapActions(useJobStore, ["setSelectedJobTypes"]),

    updateSelectedJobTypes() {
      this.setSelectedJobTypes(this.selectedJobTypes);
      this.$router.push({ name: "JobResults" });
    },
  },
  components: {
    CollapsibleAccordion,
  },
};
</script>
