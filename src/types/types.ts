import { ReactNode } from "react";

export interface UseDroppableArguments {
  id: string | number;
  disabled?: boolean;
  data?: Record<string, any>;
  children: ReactNode;
}

export interface UseDraggableArguments {
  id: string | number;
  attributes?: {
    role?: string;
    roleDescription?: string;
    tabIndex?: number;
  };
  data?: Record<string, any>;
  disabled?: boolean;
  children: ReactNode;
}

export interface ItemType {
  id: string;
  title: string;
  containerId: string;
}

export type DroppableProps = UseDroppableArguments & {
  children?: React.ReactNode;
  element?: React.ElementType;
  className?: string;
};

export type ContainerType = {
  id: string;
  name: string;
};
