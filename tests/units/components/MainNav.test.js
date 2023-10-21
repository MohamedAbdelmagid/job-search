import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";
import { describe, expect } from "vitest";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    const companyName = screen.getByText("SoftBanks Careers");
    expect(companyName).toBeInTheDocument();
  });
});
