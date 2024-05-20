"use client";
import { Item } from "@/components/item";
import { ItemsContainer } from "@/components/items-container";
import { SortableItem } from "@/components/sortable";
import SortableList from "@/components/sortableList";
import useAllItemsStore from "@/store/allItemsStore";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
  DragOverEvent,
  rectIntersection,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { act, useCallback, useEffect, useId, useState } from "react";

export default function App() {
  const id = useId();
  const allItems = useAllItemsStore((state) => state.allItems);
  const allItemsIds = useAllItemsStore((state) =>
    state.allItems.map((item) => item.id)
  );
  const updateContainerId = useAllItemsStore(
    (state) => state.updateContainerId
  );
  const containers = useAllItemsStore((state) => state.containers);

  const [overContainerId, setOverContainerId] = useState<string | null>(null);

  const setAllItems = useAllItemsStore((state) => state.setAllItems);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    // console.log("Drag Start Event:", event);
    // setActiveId(event.active.id);
  }, []);

  useEffect(() => {
    // console.log("All Items:", allItems);
    console.table(allItems);
  }, [allItems]);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      console.log("Drag End Event:", event);
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = allItems.findIndex((item) => item.id === active.id);
        const newIndex = allItems.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(allItems, oldIndex, newIndex);
        setAllItems(newItems);

        if (
          active?.data?.current?.containerId !==
          over?.data?.current?.containerId
        ) {
          updateContainerId(
            active.id as string,
            over?.data?.current?.containerId as string
          );
        }

        // if (over?.data?.current?.type === "container") {
        //   updateContainerId(
        //     active.id as string,
        //     over?.data?.current?.containerId as string
        //   );
        // }
      }
      setActiveId(null);
    },
    [allItems, setAllItems]
  );

  return (
    <main className="max-w-4xl mx-auto">
      <DndContext
        id={id}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        sensors={sensors}
        collisionDetection={rectIntersection}
      >
        <ItemsContainer />
      </DndContext>
    </main>
  );
}
