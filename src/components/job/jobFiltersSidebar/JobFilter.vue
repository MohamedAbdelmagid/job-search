<template>
  <collapsible-accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in values" :key="value" class="h-8 w-1/2">
            <input
              :id="value"
              :value="value"
              v-model="selectedValues"
              @change="updateSelectedValues"
              type="checkbox"
              class="mr-3"
            />
            <label :for="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  values: {
    type: Set,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValues = ref([]);

const router = useRouter();
const updateSelectedValues = () => {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
};
</script>
