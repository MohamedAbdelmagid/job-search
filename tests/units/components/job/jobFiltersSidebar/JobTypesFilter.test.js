import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobTypesFilter from "@/components/job/jobFiltersSidebar/JobTypesFilter.vue";
import { useJobStore } from "@/stores/job";

import { useRouter } from "vue-router";
vi.mock("vue-router");

describe("JobTypesFilter", () => {
  const setUp = () => {
    const pinia = createTestingPinia();

    const push = vi.fn();
    useRouter.mockReturnValue({ push });
    const $router = useRouter();

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

    return { component, jobStore, $router };
  };

  it("Renders unique list of jobTypes from jobs", async () => {
    const { component } = setUp();

    const button = component.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const listItems = component.getAllByRole("listitem");
    const jobTypes = listItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("When user clicks checkbox", () => {
    it("Communicates that user has selected checkbox for jobType", async () => {
      const { component, jobStore } = setUp();

      const button = component.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const checkbox = component.getByRole("checkbox", { name: /full-time/i });
      await userEvent.click(checkbox);

      expect(jobStore.setSelectedJobTypes).toHaveBeenCalledWith(["Full-time"]);
    });

    it("Navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const { component, $router } = setUp();

      const button = component.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const checkbox = component.getByRole("checkbox", { name: /full-time/i });
      await userEvent.click(checkbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
