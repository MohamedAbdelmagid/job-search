import { render } from "@testing-library/vue";
import { nextTick } from "vue";
import HeadLine from "@/components/HeadLine.vue";

describe("HeadLine", async () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("Displays introductory action verb", async () => {
    const headLine = render(HeadLine);

    const actionPhrase = headLine.getByRole("heading", {
      name: /build for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("Changes action verb at a consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);

    const headLine = render(HeadLine);

    expect(mock).toHaveBeenCalled();
  });

  it("Swaps action verb after interval", async () => {
    const headLine = render(HeadLine);
    vi.advanceTimersToNextTimer();

    await nextTick();

    const actionPhrase = headLine.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("Removes interval when component disappears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);

    const component = render(HeadLine);
    component.unmount();

    expect(clearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
