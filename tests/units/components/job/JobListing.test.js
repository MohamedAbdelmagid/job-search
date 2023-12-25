import { render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/job/JobListing.vue";

describe("JobListing", () => {
  const renderJobListing = (props = {}) => {
    return render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        job: {
          title: "Vue Developer",
          organization: "SoftBanks",
          ...props,
        },
      },
    });
  };

  it("Renders job title", () => {
    const props = { title: "Vue Programmer" };
    const component = renderJobListing(props);
    const titleElement = component.getByText(props.title);

    expect(titleElement).toBeInTheDocument();
  });

  it("Renders job locations", () => {
    const props = { locations: ["Orlando", "Jacksonville"] };
    const component = renderJobListing(props);

    for (let index = 0; index < props.locations.length; index++) {
      const location = props.locations[index];
      const locationElement = component.getByText(location);

      expect(locationElement).toBeInTheDocument();
    }
  });

  it("Renders job qualifications", () => {
    const props = { minimumQualifications: ["Code", "Develop"] };
    const component = renderJobListing(props);

    for (let index = 0; index < props.minimumQualifications.length; index++) {
      const qualification = props.minimumQualifications[index];
      const qualificationElement = component.getByText(qualification);

      expect(qualificationElement).toBeInTheDocument();
    }
  });
});
