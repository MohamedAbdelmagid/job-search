import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobTypesFilter from "@/components/job/jobFiltersSidebar/JobTypesFilter.vue";
import { useJobStore } from "@/stores/job";

describe("JobTypesFilter", () => {
  const setUp = () => {
    const pinia = createTestingPinia();

    const jobStore = useJobStore();
    jobStore.jobTypes = new Set(["Full-time", "Part-time"]);

    const component = render(JobTypesFilter, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { component, jobStore };
  };

  it("Renders unique list of jobTypes from jobs", async () => {
    const { component } = setUp();

    const button = component.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const listItems = component.getAllByRole("listitem");
    const jobTypes = listItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  it("Communicates that user has selected checkbox for jobType", async () => {
    const { component, jobStore } = setUp();

    const button = component.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const checkbox = component.getByRole("checkbox", { name: /full-time/i });
    await userEvent.click(checkbox);

    expect(jobStore.setSelectedJobTypes).toHaveBeenCalledWith(["Full-time"]);
  });
});
