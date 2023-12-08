<template>
  <form
    action=""
    class="flex h-12 w-full items-center rounded-3xl border border-brand-gray-3"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="" class="absolute -top-10 left-0">Role</label>
        <input
          type="text"
          v-model="role"
          placeholder="Software engineer"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>
      <span
        class="flex h-full items-center border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        in
      </span>
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="" class="absolute -top-10 left-0">Where ?</label>
        <input
          type="text"
          v-model="location"
          placeholder="Los Angeles"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>
    </div>
    <ActionButton
      text="Search"
      variant="secondary"
      class="rounded-r-3xl border-l border-brand-gray-3"
    />
  </form>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";

export default {
  name: "JobSearchForm",
  components: {
    ActionButton,
  },
  data() {
    return {
      role: "",
      location: "",
    };
  },
};
</script>
