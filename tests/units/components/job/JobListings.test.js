import { render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import axios from "axios";

import JobListings from "@/components/job/JobListings.vue";
vi.mock("axios");

describe("JobListings", () => {
  const link = "http://localhost:3000/jobs";

  const renderJobListings = () => {
    return render(JobListings, {
      global: {
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
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const component = renderJobListings();
    // findAllByRole func return a promise because
    // it waits for component to render
    const listings = await component.findAllByRole("listitem");

    expect(listings).toHaveLength(15);
  });
});
