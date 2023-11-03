import { render, screen } from "@testing-library/vue";
import userAction from "@testing-library/user-event";
import MainNav from "@/components/MainNav.vue";
import { describe, expect } from "vitest";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    const companyName = screen.getByText("SoftBanks Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays pages for navigation", () => {
    const component = render(MainNav);
    const menuItems = component.getAllByRole("listitem");
    const menuItemsTexts = menuItems.map((item) => item.textContent);
    expect(menuItemsTexts).toEqual([
      "Teams",
      "Locations",
      "Life at SoftBanks",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("When the user logs in", () => {
    it("Displays user profile picture", async () => {
      const component = render(MainNav);

      // Test if profile image is not exist
      let profileImage = component.queryByRole("img", {
        name: /Profile Image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      // Sign in the user
      const loginButton = component.getByRole("button", {
        name: /sign in/i,
      });
      await userAction.click(loginButton);

      // Test if profile image is exist
      profileImage = component.queryByRole("img", {
        name: /Profile Image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
