<template>
  <form
    @submit.prevent="searchJobs"
    class="flex h-12 w-full items-center rounded-3xl border border-brand-gray-3"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="role" class="absolute -top-10 left-0">Role</label>
        <TextInput id="role" v-model="role" placeholder="Software engineer" />
      </div>
      <span
        class="flex h-full items-center border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        in
      </span>
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="location" class="absolute -top-10 left-0">Where ?</label>
        <TextInput id="location" v-model="location" placeholder="Los Angeles" />
      </div>
    </div>
    <ActionButton
      text="Search"
      variant="secondary"
      class="rounded-r-3xl border-l border-brand-gray-3"
    />
  </form>
</template>

<script setup>
import ActionButton from "@/components/shared/ActionButton.vue";
import TextInput from "@/components/shared/TextInput.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const role = ref("");
const location = ref("");

const router = useRouter();
const searchJobs = () => {
  router.push({
    name: "JobResults",
    query: {
      role: role.value,
      location: location.value,
    },
  });
};
</script>
