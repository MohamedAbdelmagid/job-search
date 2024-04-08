import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";
vi.mock("vue-router");

import JobSearchForm from "@/components/job/JobSearchForm.vue";

describe("JobSearchForm", () => {
  const userInputs = {
    role: "Vue Developer",
    location: "Los Anglos",
  };

  describe("When user submits form", () => {
    it("Directs user to job results page with user's search parameter", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });

      const component = render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = component.getByRole("textbox", {
        name: /role/i,
      });
      await userEvent.type(roleInput, userInputs.role);

      const locationInput = component.getByRole("textbox", {
        name: /Where ?/i,
      });
      await userEvent.type(locationInput, userInputs.location);

      const submitButton = component.getByRole("button", {
        name: /search/i,
      });
      await submitButton.click();

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: userInputs.role,
          location: userInputs.location,
        },
      });
    });
  });
});
