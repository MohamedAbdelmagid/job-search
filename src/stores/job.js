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
    filteredJobs(state) {
      if (!state.selectedOrgs.length) return state.jobs;
      return state.jobs.filter((job) =>
        state.selectedOrgs.includes(job.organization)
      );
    },
  },
});
