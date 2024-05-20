import { Card, CardHeader } from "./ui/card";

interface ItemProps {
  title: string;
  id?: string;
}

export function Item({ title }: ItemProps) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
    </Card>
  );
}
