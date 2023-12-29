import { render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import JobListings from "@/components/job/JobListings.vue";
import { useJobStore } from "@/stores/job";

describe("JobListings", () => {
  const link = import.meta.env.VITE_API_URL + "/jobs";
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "1",
      ...queryParams,
    },
  });

  const renderJobListings = ($route = createRoute()) => {
    const pinia = createTestingPinia();
    return render(JobListings, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("Fetches jobs", () => {
    renderJobListings();

    const store = useJobStore();
    expect(store.fetchJobs).toHaveBeenCalled();
  });

  it("Displays maximum of 10 jobs", async () => {
    const component = renderJobListings();

    const store = useJobStore();
    store.jobs = Array(15).fill({});
    // findAllByRole func return a promise because
    // it waits for component to render
    const listings = await component.findAllByRole("listitem");
    expect(listings).toHaveLength(10);
  });

  describe("When params exclude page number", () => {
    it("Displays page number 1", () => {
      const $route = createRoute({ page: undefined });
      const component = renderJobListings($route);

      const pageNum = component.getByText("Page 1");
      expect(pageNum).toBeInTheDocument();
    });
  });

  describe("When params include page number", () => {
    it("Displays the same number of the page", () => {
      const $route = createRoute({ page: "4" });
      const component = renderJobListings($route);

      const pageNum = component.getByText("Page 4");
      expect(pageNum).toBeInTheDocument();
    });
  });

  describe("When user is on first page", () => {
    it("Does not show link to previous page", async () => {
      const component = renderJobListings();

      const store = useJobStore();
      store.jobs = Array(20).fill({});

      await component.findAllByRole("listitem"); // Make sure jobs are rendered

      const previousLink = component.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("Shows link to next page", async () => {
      const component = renderJobListings();

      const store = useJobStore();
      store.jobs = Array(20).fill({});

      await component.findAllByRole("listitem"); // Make sure jobs are rendered

      const nextLink = component.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("When user is on last page", () => {
    it("Does not show link to next page", async () => {
      const component = renderJobListings(createRoute({ page: "2" }));

      const store = useJobStore();
      store.jobs = Array(20).fill({});

      await component.findAllByRole("listitem"); // Make sure jobs are rendered

      const nextLink = component.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("Shows link to previous page", async () => {
      const component = renderJobListings(createRoute({ page: "2" }));

      const store = useJobStore();
      store.jobs = Array(20).fill({});

      await component.findAllByRole("listitem"); // Make sure jobs are rendered

      const previousLink = component.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
