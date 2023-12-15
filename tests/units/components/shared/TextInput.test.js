import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import TextInput from "@/components/shared/TextInput.vue";

describe("TextInput", () => {
  it("Communicates that user has entered text", async () => {
    const component = render(TextInput, {
      props: {
        modelValue: "",
      },
    });

    const input = component.getByRole("textbox");
    await userEvent.type(input, "KH");

    const events = component.emitted();
    expect(events["update:modelValue"]).toEqual([["K"], ["KH"]]);
  });
});
