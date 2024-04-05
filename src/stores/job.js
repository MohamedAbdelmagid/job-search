import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";

export const useJobStore = defineStore("job", {
  state: () => ({
    jobs: [],
    selectedOrgs: [],
    selectedJobTypes: [],
  }),
  actions: {
    async fetchJobs() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
    setSelectedOrgs(orgs) {
      this.selectedOrgs = orgs;
    },
    setSelectedJobTypes(types) {
      this.selectedJobTypes = types;
    },
  },
  getters: {
    organizations(state) {
      const uniqueOrganizations = new Set();
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
      return uniqueOrganizations;
    },
    jobTypes(state) {
      const uniqueJobTypes = new Set();
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
      return uniqueJobTypes;
    },
    filterByOrgs: (state) => (job) => {
      const noSelectedOrg = state.selectedOrgs.length == 0;
      if (noSelectedOrg) return true;
      return state.selectedOrgs.includes(job.organization);
    },
    filterByTypes: (state) => (job) => {
      const noSelectedType = state.selectedJobTypes.length == 0;
      if (noSelectedType) return true;
      return state.selectedJobTypes.includes(job.jobType);
    },
    filteredJobs(state) {
      return state.jobs
        .filter((job) => this.filterByOrgs(job))
        .filter((job) => this.filterByTypes(job));
    },
  },
});
