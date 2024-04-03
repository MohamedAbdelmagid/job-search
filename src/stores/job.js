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
    jobsByOrgs(state) {
      if (!state.selectedOrgs.length) return state.jobs;
      return state.jobs.filter((job) =>
        state.selectedOrgs.includes(job.organization)
      );
    },
    jobsByTypes(state) {
      if (!state.selectedJobTypes.length) return state.jobs;
      return state.jobs.filter((job) =>
        state.selectedJobTypes.includes(job.jobType)
      );
    },
  },
});
