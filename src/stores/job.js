import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";

export const useJobStore = defineStore("job", {
  state: () => ({
    jobs: [],
    selectedOrgs: [],
  }),
  actions: {
    async fetchJobs() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
    setSelectedOrgs(orgs) {
      this.selectedOrgs = orgs;
    },
  },
  getters: {
    organizations(state) {
      const uniqueOrganizations = new Set();
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
      return uniqueOrganizations;
    },
  },
});
