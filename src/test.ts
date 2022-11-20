import TreeStore from "./TreeStore";
import NodeItem from "./NodeItem";
function arraysEqual(a: any[], b: any[]) {
  expect(a.length).toEqual(b.length);
  for (const aEl of a) {
    expect(b).toContainEqual(aEl);
  }
}

describe("testcase", () => {
  const items = [
    { id: 1, parent: "root" },
    { id: 2, parent: 1, type: "test" },
    { id: 3, parent: 1, type: "test" },
    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ];
  const shuffledItems = [...items].sort(() => (Math.random() > 0.5 ? 1 : -1));
  const tree = new TreeStore(shuffledItems);

  test("getAll", () => {
    const result = tree.getAll();
    arraysEqual(result, items);
  });

  test("getItem(1)", () => {
    const result = tree.getItem(2);
    expect(result).toEqual(items[1]);
  });

  test("getItem with wrong id", () => {
    const result = tree.getItem("sfsdf");
    expect(result).toBeUndefined();
  });

  test("getChildren(4)", () => {
    const result = tree.getChildren(4)!;
    const expected = [
      { id: 8, parent: 4, type: null },
      { id: 7, parent: 4, type: null },
    ];
    arraysEqual(result, expected);
  });

  test("getChildren(5)", () => {
    const result = tree.getChildren(5)!;
    const expected: NodeItem[] = [];
    arraysEqual(result, expected);
  });

  test("getChildren with wrong id)", () => {
    const result = tree.getChildren("333");
    expect(result).toBeUndefined();
  });

  // there is no element with id "root" so it cannot have children
  test("getChildren with root id)", () => {
    const result = tree.getChildren("root");
    expect(result).toBeUndefined();
  });

  test("getAllChildren(2)", () => {
    const result = tree.getAllChildren(2)!;
    const expected = [
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ];
    arraysEqual(result, expected);
  });

  test("getAllChildren with wrong id", () => {
    const result = tree.getChildren("ccds");
    expect(result).toBeUndefined();
  });

  // there is no element with id "root" so it cannot have children
  test("getAllChildren with root id)", () => {
    const result = tree.getAllChildren("root");
    expect(result).toBeUndefined();
  });

  test("getAllParents(7)", () => {
    const result = tree.getAllParents(7)!;
    const expected = [
      { id: 4, parent: 2, type: "test" },
      { id: 2, parent: 1, type: "test" },
      { id: 1, parent: "root" },
    ];
    expect(result).toEqual(expected);
  });

  test("getAllParents(1)", () => {
    const result = tree.getAllParents(1)!;
    const expected: NodeItem[] = [];
    expect(result).toEqual(expected);
  });

  test("getAllParents with wrong id", () => {
    const result = tree.getAllParents(345)!;
    expect(result).toBeUndefined();
  });

  // there is no element with id "root" so it cannot have children
  test("getAllParents with root id", () => {
    const result = tree.getAllParents("root")!;
    expect(result).toBeUndefined();
  });
});
