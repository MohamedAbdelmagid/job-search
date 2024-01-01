import { render } from "@testing-library/vue";

import HeaderContainer from "@/components/shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  const renderHeaderContainer = (slots) => {
    return render(HeaderContainer, {
      slots,
    });
  };

  it("Allows parent component to provide title", async () => {
    const slots = { title: "<h2>Title</h2>" };
    const component = renderHeaderContainer(slots);

    const text = component.getByText("Title");
    expect(text).toBeInTheDocument();
  });

  it("Allows parent component to provide subtitle", async () => {
    const slots = { subtitle: "<h2>Subtitle</h2>" };
    const component = renderHeaderContainer(slots);

    const text = component.getByText("Subtitle");
    expect(text).toBeInTheDocument();
  });
});
