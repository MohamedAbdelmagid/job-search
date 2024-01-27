import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobStore } from "@/stores/job";

vi.mock("axios");

describe("Job Module", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const jobs = [{ id: 1, title: "Vue Developer" }];

  describe("State", () => {
    it("Checks no jobs at the start", () => {
      const store = useJobStore();
      expect(store.jobs).toEqual([]);
    });

    it("Checks no job types selected at the start", () => {
      const store = useJobStore();
      expect(store.selectedJobTypes).toEqual([]);
    });
  });

  describe("Actions", () => {
    describe("fetchJobs", () => {
      it("Makes API request and stores received jobs", async () => {
        axios.get.mockResolvedValue({
          data: jobs,
        });

        const store = useJobStore();
        await store.fetchJobs();

        expect(store.jobs).toEqual(jobs);
      });
    });

    describe("setSelectedOrgs", () => {
      it("Updates orgs the user has chosed to filter jobs by", () => {
        const orgs = ["VueTube", "Google"];

        const store = useJobStore();
        store.setSelectedOrgs(orgs);

        expect(store.selectedOrgs).toEqual(orgs);
      });
    });

    describe("setSelectedJobTypes", () => {
      it("Updates types the user has chosed to filter jobs by", () => {
        const types = ["Full-time", "Part-time"];

        const store = useJobStore();
        store.setSelectedJobTypes(types);

        expect(store.selectedJobTypes).toEqual(types);
      });
    });
  });

  describe("Getters", () => {
    describe("organization", () => {
      it("Finds unique organizations from list of jobs", () => {
        const store = useJobStore();
        store.jobs = [
          { organization: "VueTube" },
          { organization: "Google" },
          { organization: "VueTube" },
        ];

        const expectedSet = new Set(["VueTube", "Google"]);
        expect(store.organizations).toEqual(expectedSet);
      });
    });

    describe("Job types", () => {
      it("Finds unique job types from list of jobs", () => {
        const store = useJobStore();
        store.jobs = [
          { jobType: "Full-time" },
          { jobType: "Temporary" },
          { jobType: "Full-time" },
        ];

        const expectedSet = new Set(["Full-time", "Temporary"]);
        expect(store.jobTypes).toEqual(expectedSet);
      });
    });

    describe("Filtered jobs by orgs", () => {
      const jobs = [
        { organization: "VueTube" },
        { organization: "Google" },
        { organization: "Amazon" },
      ];

      it("Identifies jobs that are associated with the given orgs", () => {
        const store = useJobStore();
        store.jobs = jobs;
        store.setSelectedOrgs(["VueTube", "Amazon"]);

        expect(store.filteredJobs).toEqual([
          { organization: "VueTube" },
          { organization: "Amazon" },
        ]);
      });

      describe("When user has not selected any orgs", () => {
        it("Returns all jobs", () => {
          const store = useJobStore();
          store.jobs = jobs;

          store.setSelectedOrgs([]);

          expect(store.filteredJobs).toEqual(jobs);
        });
      });
    });

    describe("Filtered jobs by job types", () => {
      const jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Part-time" },
      ];

      it("Identifies jobs that are associated with the given types", () => {
        const store = useJobStore();
        store.jobs = jobs;
        store.setSelectedJobTypes(["Full-time", "Part-time"]);

        expect(store.jobsByTypes).toEqual([
          { jobType: "Full-time" },
          { jobType: "Part-time" },
        ]);
      });

      describe("When user has not selected any job type", () => {
        it("Returns all jobs", () => {
          const store = useJobStore();
          store.jobs = jobs;

          store.setSelectedJobTypes([]);

          expect(store.jobsByTypes).toEqual(jobs);
        });
      });
    });
  });
});
