import { render } from "@testing-library/vue";
import userAction from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import MainNav from "@/components/nav/MainNav.vue";

describe("MainNav", () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia({ stubActions: false });
    
    return render(MainNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: "Home",
          },
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("Displays company name", () => {
    const component = renderMainNav();
    const companyName = component.getByText("SoftBanks Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("Displays pages for navigation", () => {
    const component = renderMainNav();
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

  it("Applies primary style to sign in button", () => {
    const component = renderMainNav();

    // Sign in button
    const loginButton = component.getByRole("button", {
      name: /sign in/i,
    });

    expect(loginButton).toHaveClass("primary");
  });

  describe("When the user logs in", () => {
    it("Displays user profile picture", async () => {
      const component = renderMainNav();

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
