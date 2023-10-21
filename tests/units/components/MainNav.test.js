import { render, screen } from "@testing-library/vue";
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
});
