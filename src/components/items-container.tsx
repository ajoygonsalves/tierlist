import { useEffect, useState } from "react";
import { Item } from "./item";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { ItemType } from "@/types/types";
import { Droppable } from "./droppable";
import { Draggable } from "./draggable";
import useAllItemsStore from "@/store/allItemsStore";
import { SortableItem } from "./sortable";
import {
  SortableContext,
  horizontalListSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";

const array = [1, 2, 3];

type ContainerItem = {
  id?: string;
};

export function ItemsContainer() {
  const allItems = useAllItemsStore((state) => state.allItems);
  const containers = useAllItemsStore((state) => state.containers);

  function getItemsForContainer(containerId: string) {
    return allItems
      .filter((item) => item.containerId === containerId)
      .map((item) => item.id);
  }

  return (
    <>
      {containers.map((container, index) => (
        <SortableContext
          key={container.id}
          items={allItems.map((item) => item.id)}
          strategy={rectSwappingStrategy}
        >
          <Droppable
            key={container.id}
            id={container.id}
            className="flex flex-row gap-2 p-4 bg-slate-300 rounded-xl"
          >
            {container.id !== "all-items" ? (
              <Item title={`Tier ${index}`} />
            ) : null}
            {getItemsForContainer(container.id).map((itemId) => {
              const item = allItems.find((item) => item.id === itemId);
              return item ? ( // Ensure item is not undefined
                <>
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    containerId={item.containerId}
                  >
                    <Item title={item.title} />
                  </SortableItem>
                </>
              ) : null;
            })}
          </Droppable>
        </SortableContext>
      ))}
    </>
  );
}
