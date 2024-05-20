import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

type SortableProps = {
  element?: React.ElementType;
  children?: ReactNode;
  id: string | number;
  className?: string;
  containerId?: string;
};

export function SortableItem(props: SortableProps) {
  const Element = props.element || "div";
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: {
        type: "item",
        containerId: props.containerId,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
    touchaction: "none",
  };

  return (
    <Element
      className={props.className}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </Element>
  );
}
