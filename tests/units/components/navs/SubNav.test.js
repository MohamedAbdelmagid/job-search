import { render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import SubNav from "@/components/nav/SubNav.vue";
import { useJobStore } from "@/stores/job";

import { useRoute } from "vue-router";
vi.mock("vue-router");

describe("SubNav", () => {
  const setUp = (routeName) => {
    const pinia = createTestingPinia();
    const jobStore = useJobStore();
    useRoute.mockReturnValue({ name: routeName });

    const component = render(SubNav, {
      global: {
        plugins: [pinia],
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
