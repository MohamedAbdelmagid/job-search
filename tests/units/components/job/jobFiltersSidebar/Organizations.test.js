import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import Organizations from "@/components/job/jobFiltersSidebar/Organizations.vue";
import { useJobStore } from "@/stores/job";

describe("Organizations", () => {
  const renderOrganizations = (pinia) => {
    return render(Organizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it("Renders unique list of organizations from jobs", async () => {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();
    jobStore.organizations = new Set(["Google", "Amazon"]);

    const component = renderOrganizations(pinia);

    const button = component.getByRole("button", { name: /organization/i });
    await userEvent.click(button);

    const listItems = component.getAllByRole("listitem");
    const orgs = listItems.map((node) => node.textContent);
    expect(orgs).toEqual(["Google", "Amazon"]);
  });
});
