import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  const list = ["A", "B", "C", "D", "F"];

  it("Locates an element in list and returns the next element", () => {
    const element = "C";
    const nextElement = nextElementInList(list, element);
    expect(nextElement).toBe("D");
  });

  describe("When the element is at the end of the list", () => {
    it("locates the element at the start of the list", () => {
      const element = "F";
      const nextElement = nextElementInList(list, element);
      expect(nextElement).toBe("A");
    });
  });
});
