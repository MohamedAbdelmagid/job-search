import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import OrganizationsFilter from "@/components/job/jobFiltersSidebar/OrganizationsFilter.vue";
import { useJobStore } from "@/stores/job";

describe("OrganizationsFilter", () => {
  const setUp = () => {
    const pinia = createTestingPinia();
    const $router = { push: vi.fn() };

    const jobStore = useJobStore();
    jobStore.organizations = new Set(["Google", "Amazon"]);

    const component = render(OrganizationsFilter, {
      global: {
        mocks: {
          $router,
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { component, jobStore, $router };
  };

  it("Renders unique list of organizations from jobs", async () => {
    const { component } = setUp();

    const button = component.getByRole("button", { name: /organization/i });
    await userEvent.click(button);

    const listItems = component.getAllByRole("listitem");
    const orgs = listItems.map((node) => node.textContent);
    expect(orgs).toEqual(["Google", "Amazon"]);
  });

  describe("When user clicks checkbox", () => {
    it("Communicates that user has selected checkbox for organization", async () => {
      const { component, jobStore } = setUp();

      const button = component.getByRole("button", { name: /organization/i });
      await userEvent.click(button);

      const checkbox = component.getByRole("checkbox", { name: /amazon/i });
      await userEvent.click(checkbox);

      expect(jobStore.setSelectedOrgs).toHaveBeenCalledWith(["Amazon"]);
    });

    it("Navigates user to job results page to see new batch of jobs", async () => {
      const { component, $router } = setUp();

      const button = component.getByRole("button", { name: /organization/i });
      await userEvent.click(button);

      const checkbox = component.getByRole("checkbox", { name: /amazon/i });
      await userEvent.click(checkbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
