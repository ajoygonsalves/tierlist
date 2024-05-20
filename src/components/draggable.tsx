import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { DraggableElement } from "@dnd-kit/core/dist/store";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

type DraggableProps = {
  element?: React.ElementType;
  children?: ReactNode;
  id: string;
};

export function Draggable(props: DraggableProps) {
  const Element = props.element || "div";
  const { attributes, listeners, setNodeRef, transform, active, over } =
    useDraggable({
      id: props.id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Element
      id={props.id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {props.children}
    </Element>
  );
}
