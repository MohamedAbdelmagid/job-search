import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilter from "@/components/job/jobFiltersSidebar/JobFilter.vue";

import { useRouter } from "vue-router";
vi.mock("vue-router");

describe("JobFilter", () => {
  const createProps = (props = {}) => ({
    header: "Header",
    values: new Set(["Value-1", "Value-2"]),
    action: vi.fn(),
    ...props,
  });

  const setUp = (props = {}) => {
    const pinia = createTestingPinia();

    const push = vi.fn();
    useRouter.mockReturnValue({ push });
    const $router = useRouter();

    const componentProps = createProps();

    const component = render(JobFilter, {
      props: componentProps,
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { component, $router, componentProps };
  };

  it("Renders unique list of values from jobs", async () => {
    const { component, componentProps } = setUp();

    const button = component.getByRole("button", { name: /header/i });
    await userEvent.click(button);

    const listItems = component.getAllByRole("listitem");
    const values = listItems.map((node) => node.textContent);
    const renderedValues = new Set(values);

    expect(renderedValues).toEqual(componentProps.values);
  });

  describe("When user clicks checkbox", () => {
    it("Communicates that user has selected checkbox", async () => {
      const { component, componentProps } = setUp();

      const button = component.getByRole("button", { name: /header/i });
      await userEvent.click(button);

      const checkbox = component.getByRole("checkbox", { name: /Value-1/i });
      await userEvent.click(checkbox);

      expect(componentProps.action).toHaveBeenCalledWith(["Value-1"]);
    });

    it("Navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const { component, $router } = setUp();

      const button = component.getByRole("button", { name: /header/i });
      await userEvent.click(button);

      const checkbox = component.getByRole("checkbox", { name: /Value-1/i });
      await userEvent.click(checkbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
