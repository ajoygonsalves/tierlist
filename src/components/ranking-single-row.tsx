import { Item } from "./item";
import { Card } from "./ui/card";

export function RankingSingleRow() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="grid grid-cols-12">
        <Card className="p-4 h-full bg-orange-400">
          <Item />
        </Card>
        {array.map((item: number) => (
          <Card key={item} className="p-4 h-full">
            <Item />
          </Card>
        ))}
      </div>
    </>
  );
}
