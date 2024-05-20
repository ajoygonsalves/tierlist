import { ContainerType, ItemType } from "@/types/types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type AllItemsState = {
  allItems: ItemType[];
  containers: ContainerType[];
  addItem: (title: string, containerId: string) => void;
  setAllItems: (items: ItemType[]) => void;
  deleteItem: (id: string) => void;
  updateItem: (id: string, title: string) => void;
  updateContainerId: (id: string, containerId: string) => void;
  addContainer: (name: string) => void;
};

const initialItems: ItemType[] = [
  { id: "item-1", title: "Item 1", containerId: "all-items" },
  { id: "item-2", title: "Item 2", containerId: "all-items" },
  { id: "item-3", title: "Item 3", containerId: "all-items" },
  { id: "item-4", title: "Item 4", containerId: "tier-1" },
  { id: "item-5", title: "Item 5", containerId: "tier-1" },
  { id: "item-6", title: "Item 7", containerId: "tier-1" },
  { id: "item-7", title: "Item 8", containerId: "tier-2" },
  { id: "item-8", title: "Item 9", containerId: "tier-3" },
  { id: "item-9", title: "Item 10", containerId: "tier-4" },
];

const initialContainers: ContainerType[] = [
  { id: "all-items", name: "All Items" },
  { id: "tier-1", name: "Tier 1" },
  { id: "tier-2", name: "Tier 2" },
  { id: "tier-3", name: "Tier 3" },
  { id: "tier-4", name: "Tier 4" },
];

const useAllItemsStore = create<AllItemsState>()((set) => ({
  allItems: initialItems,
  containers: initialContainers,
  addItem: (title, containerId) =>
    set((state) => ({
      allItems: [...state.allItems, { id: uuidv4(), title, containerId }],
    })),
  setAllItems: (items) => set(() => ({ allItems: items })),
  deleteItem: (id) =>
    set((state) => ({
      allItems: state.allItems.filter((item) => item.id !== id),
    })),
  updateItem: (id, title) =>
    set((state) => ({
      allItems: state.allItems.map((item) =>
        item.id === id ? { ...item, title } : item
      ),
    })),
  updateContainerId: (id, containerId) =>
    set((state) => ({
      allItems: state.allItems.map((item) =>
        item.id === id ? { ...item, containerId } : item
      ),
    })),
  addContainer: (name) =>
    set((state) => ({
      containers: [...state.containers, { id: uuidv4(), name }],
    })),
}));

export default useAllItemsStore;
