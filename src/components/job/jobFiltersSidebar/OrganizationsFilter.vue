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

<script>
import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";
import { mapState, mapActions } from "pinia";
import { useJobStore } from "@/stores/job";

export default {
  name: "Organizations",
  data() {
    return {
      selectedOrgs: [],
    };
  },
  computed: {
    ...mapState(useJobStore, ["organizations"]),
  },
  methods: {
    ...mapActions(useJobStore, ["setSelectedOrgs"]),

    updateSelectedOrgs() {
      this.setSelectedOrgs(this.selectedOrgs);
      this.$router.push({ name: "JobResults" });
    },
  },
  components: {
    CollapsibleAccordion,
  },
};
</script>
