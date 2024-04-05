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
    const jobs = [
      { organization: "VueTube", jobType: "Full-time" },
      { organization: "Google", jobType: "Temporary" },
      { organization: "Amazon", jobType: "Full-time" },
    ];

    describe("organizations", () => {
      it("Finds unique organizations from list of jobs", () => {
        const store = useJobStore();
        store.jobs = jobs;

        const expectedSet = new Set(["VueTube", "Google", "Amazon"]);
        expect(store.organizations).toEqual(expectedSet);
      });
    });

    describe("jobTypes", () => {
      it("Finds unique job types from list of jobs", () => {
        const store = useJobStore();
        store.jobs = jobs;

        const expectedSet = new Set(["Full-time", "Temporary"]);
        expect(store.jobTypes).toEqual(expectedSet);
      });
    });

    describe("FilterByOrgs", () => {
      describe("When user has not selected any orgs", () => {
        it("Returns true always", () => {
          const store = useJobStore();
          store.jobs = jobs;
          store.setSelectedOrgs([]);

          const result = store.filterByOrgs(jobs[0]);
          expect(result).toEqual(true);
        });
      });
    });

    describe("FilterByTypes", () => {
      describe("When user has not selected any type", () => {
        it("Returns true always", () => {
          const store = useJobStore();
          store.jobs = jobs;
          store.setSelectedJobTypes([]);

          const result = store.filterByTypes(jobs[0]);
          expect(result).toEqual(true);
        });
      });
    });

    describe("filteredJobs", () => {
      describe("When user has selected orgs", () => {
        it("Identifies jobs that are associated with the given orgs", () => {
          const store = useJobStore();
          store.jobs = jobs;
          store.setSelectedOrgs(["VueTube", "Amazon"]);

          expect(store.filteredJobs).toEqual([jobs[0], jobs[2]]);
        });
      });

      describe("When user has selected types", () => {
        it("Identifies jobs that are associated with the given types", () => {
          const store = useJobStore();
          store.jobs = jobs;
          store.setSelectedJobTypes(["Full-time"]);

          expect(store.filteredJobs).toEqual([jobs[0], jobs[2]]);
        });
      });

      describe("When user has selected types & orgs", () => {
        it("Identifies jobs that are associated with the given types & orgs", () => {
          const store = useJobStore();
          store.jobs = jobs;

          store.setSelectedJobTypes(["Full-time"]);
          store.setSelectedOrgs(["Amazon"]);

          expect(store.filteredJobs).toEqual([jobs[2]]);
        });
      });
    });
  });
});
