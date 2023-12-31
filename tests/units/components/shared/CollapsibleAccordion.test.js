import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  const renderCollapsibleAccordion = (config = {}) => {
    return render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "My Category",
      },
      slots: {
        default: "<h3>My nested child</h3>",
      },
      ...config,
    });
  };

  it("Renders child content", async () => {
    const component = renderCollapsibleAccordion();

    let text = component.queryByText("My nested child");
    expect(text).not.toBeInTheDocument();

    const button = component.getByRole("button", { name: /my category/i });
    await userEvent.click(button);

    text = component.getByText("My nested child");
    expect(text).toBeInTheDocument();
  });

  it("Renders with no slot", async () => {
    const component = renderCollapsibleAccordion({ slots: {} });

    const button = component.getByRole("button", { name: /my category/i });
    await userEvent.click(button);

    const text = component.getByText("No Filters");
    expect(text).toBeInTheDocument();
  });
});
