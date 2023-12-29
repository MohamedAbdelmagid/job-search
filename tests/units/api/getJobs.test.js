import axios from "axios";
import getJobs from "@/api/getJobs";

vi.mock("axios");

describe("getJobs", () => {
  const jobs = [{ id: 1, title: "Vue Developer" }];
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: jobs,
    });
  });

  it("Fetches data from the right endpoint", async () => {
    await getJobs();

    const jobsURL = import.meta.env.VITE_API_URL + "/jobs";
    expect(axios.get).toHaveBeenCalledWith(jobsURL);
  });

  it("Extracts jobs from response", async () => {
    const fetchedJobs = await getJobs();

    expect(fetchedJobs).toEqual(jobs);
  });
});
