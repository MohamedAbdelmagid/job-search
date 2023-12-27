import { render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import axios from "axios";

import JobListings from "@/components/job/JobListings.vue";
vi.mock("axios");

describe("JobListings", () => {
  const link = "http://localhost:3000/jobs";
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "1",
      ...queryParams,
    },
  });

  const renderJobListings = ($route = createRoute()) => {
    return render(JobListings, {
      global: {
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
    axios.get.mockResolvedValue({ data: [] });
    renderJobListings();

    expect(axios.get).toHaveBeenCalledWith(link);
  });

  it("Creates a job listing for every job", async () => {
    axios.get.mockResolvedValue({ data: Array(10).fill({}) });
    const component = renderJobListings();
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
    it("Does no show link to previous page", async () => {
      axios.get.mockResolvedValue({ data: Array(20).fill({}) });

      const component = renderJobListings();
      await component.findAllByRole("listitem");  // Make sure jobs are rendered

      const previousLink = component.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("Shows link to next page", async () => {
      axios.get.mockResolvedValue({ data: Array(20).fill({}) });

      const component = renderJobListings();
      await component.findAllByRole("listitem");  // Make sure jobs are rendered

      const nextLink = component.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
