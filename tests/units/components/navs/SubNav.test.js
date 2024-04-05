import { render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import SubNav from "@/components/nav/SubNav.vue";
import { useJobStore } from "@/stores/job";

describe("SubNav", () => {
  const setUp = (routeName) => {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();

    const component = render(SubNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { component, jobStore };
  };

  describe("When user is on jobs page", () => {
    it("Displays job count", async () => {
      const routeName = "JobResults";
      const { component, jobStore } = setUp(routeName);

      const numbersOfJobs = 16;
      jobStore.jobs = Array(numbersOfJobs).fill({});

      const jobsCount = await component.findByText(numbersOfJobs);
      expect(jobsCount).toBeInTheDocument();
    });
  });

  describe("When user is NOT on jobs page", () => {
    it("Does NOT display job count", () => {
      const routeName = "Home";
      const { component, jobStore } = setUp(routeName);

      const numbersOfJobs = 16;
      jobStore.jobs = Array(numbersOfJobs).fill({});

      const jobsCount = component.queryByText(numbersOfJobs);
      expect(jobsCount).not.toBeInTheDocument();
    });
  });
});
