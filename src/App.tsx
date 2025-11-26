import React, { useState } from "react";
import {
  useDroppable,
  useDraggable,
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";

export default function App() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState<UniqueIdentifier>("");
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent ? "" : draggableMarkup}
      <DragOverlay>
        <button>Drag me</button>
      </DragOverlay>

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? `${id} is the parent` : "Drop here " + id}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : "");
  }
}

function Droppable(props: { id: UniqueIdentifier; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Draggable(props: { id: UniqueIdentifier; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <button ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
