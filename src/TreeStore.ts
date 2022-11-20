import NodeItem from "./NodeItem";

export default class TreeStore {
  itemById: { [key: string | number]: NodeItem } = {};
  childrenById: { [key: string | number]: NodeItem[] } = {};
  items: NodeItem[] = [];

  constructor(items: NodeItem[]) {
    this.items = [...items];
    for (const item of items) {
      this.childrenById[item.id] = [];
    }
    for (const item of items) {
      this.itemById[item.id] = item;
      this.childrenById[item.parent]?.push(item);
    }
  }

  getAll(): NodeItem[] {
    return this.items;
  }

  getItem(id: number | string): NodeItem | undefined {
    return this.itemById[id];
  }

  getChildren(id: number | string): NodeItem[] | undefined {
    return this.childrenById[id];
  }

  getAllChildren(id: number | string): NodeItem[] | undefined {
    const children = this.getChildren(id);
    if (children === undefined) {
      return undefined;
    }
    const result = [...children];
    for (const child of children) {
      result.push(...this.getAllChildren(child.id)!);
    }
    return result;
  }

  getAllParents(id: number | string): NodeItem[] | undefined {
    let currNode = this.getItem(id);
    if (currNode === undefined) {
      return undefined;
    }
    currNode = this.getItem(currNode.parent);
    const result = [];
    while (currNode !== undefined) {
      result.push(currNode);
      currNode = this.getItem(currNode.parent);
    }
    return result;
  }
}
