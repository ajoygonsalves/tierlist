import { cn } from "@/lib/utils";
import { DroppableProps } from "@/types/types";
import { UseDroppableArguments, useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export function Droppable(props: DroppableProps) {
  const Element = props.element || "div";
  const { setNodeRef } = useDroppable({
    id: props.id,
    data: {
      type: "container",
      containerId: props.id,
    },
  });

  return (
    <Element className={props.className} ref={setNodeRef}>
      {props.children}
    </Element>
  );
}
