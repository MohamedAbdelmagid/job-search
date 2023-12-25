<template>
  <li class="mb-7">
    <router-link
      :to="jobLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pb-2 pt-5">
        <h2 class="mb-2 text-2xl">{{ job.title }}</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>{{ job.organization }}</span>
          </div>
          <div>
            <ul>
              <li
                v-for="location in job.locations"
                :key="location"
                class="mr-5 inline-block"
              >
                <span>
                  {{ location }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="px-8 py-4">
        <ul class="list-disc pl-8">
          <li
            v-for="qualification in job.minimumQualifications"
            :key="qualification"
          >
            {{ qualification }}
          </li>
        </ul>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "JobListing",
  props: {
    job: {
      type: Object,
      reuqired: true,
    },
  },
  computed: {
    jobLink() {
      return "/jobs/" + this.job.id;
    },
  },
};
</script>
