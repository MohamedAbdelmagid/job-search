import { render } from "@testing-library/vue";
import axios from "axios";

import SpotLights from "@/components/job/SpotLights.vue";

vi.mock("axios");

describe("SpotLights", () => {
  const spotlight = {
    id: 1,
    img: "Some image",
    title: "Some title",
    description: "Some description",
  }

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [spotlight],
    });
  });

  const renderSpotLights = (slots = {}) => {
    return render(SpotLights, { slots });
  };

  it("Provides image to parent component", async () => {
    const component = renderSpotLights({
      default: `
        <template #default="{ spotlight }">
          <h1>{{ spotlight.img }}</h1>
        </template>
      `
    });

    const text = await component.findByText(spotlight.img);
    expect(text).toBeInTheDocument();
  });

  it("Provides title to parent component", async () => {
    const component = renderSpotLights({
      default: `
        <template #default="{ spotlight }">
          <h1>{{ spotlight.title }}</h1>
        </template>
      `
    });

    const text = await component.findByText(spotlight.title);
    expect(text).toBeInTheDocument();
  });

  it("Provides description to parent component", async () => {
    const component = renderSpotLights({
      default: `
        <template #default="{ spotlight }">
          <h1>{{ spotlight.description }}</h1>
        </template>
      `
    });

    const text = await component.findByText(spotlight.description);
    expect(text).toBeInTheDocument();
  });
});
