import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "@/stores/user";

describe("User Module", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("State", () => {
    it("Checks if user is logged in at the start of state", () => {
      const store = useUserStore();
      expect(store.isLoggedIn).toBe(false);
    });
  });

  describe("Actions", () => {
    describe("loginUser", () => {
      it("logs the user in", () => {
        const store = useUserStore();
        store.loginUser();
        expect(store.isLoggedIn).toBe(true);
      });
    });
  });
});
