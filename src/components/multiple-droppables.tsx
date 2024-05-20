import { Droppable } from "./droppable";

export function MultipleDroppables() {
  const droppables = ["1", "2", "3", "4"];

  return (
    <section>
      {droppables.map((id) => (
        <Droppable key={id} id={id}>
          Droppable container id: ${id}
        </Droppable>
      ))}
    </section>
  );
}
