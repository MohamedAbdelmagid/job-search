import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";

export const useJobStore = defineStore("job", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async fetchJobs() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },
});
