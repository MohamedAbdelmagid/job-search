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
  });
});
