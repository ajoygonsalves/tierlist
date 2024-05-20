import React, { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortable"; // Adjust the import path as necessary

// Ensure that initial items have unique string IDs
const initialItems = ["item-1", "item-2", "item-3", "item-4"];

type SortableList = {
  id: string;
};

export default function SortableList({ id }: SortableList) {
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string); // Explicitly cast to string
        const newIndex = items.indexOf(over.id as string); // Explicitly cast to string

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  return (
    <DndContext id={id}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id}>
            {id.replace("item-", "Item ")}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
