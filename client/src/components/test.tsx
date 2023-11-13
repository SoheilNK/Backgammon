import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  useDraggable,
  DragOverlay,
} from "@dnd-kit/core";

type DraggableItemProps = {
  id: string;
  children: React.ReactNode;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ id, children }) => {
  const { setNodeRef, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid black",
        margin: "10px",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
};

const DragAndDropComponent: React.FC = () => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [coordinates, setCoordinates] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const onDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const onDragMove = (event: any) => {
    if (event) {
      const { pointer } = event;
      setCoordinates({
        x: -pointer.x,
        y: -pointer.y,
      });
    }
  };

  const onDragEnd = () => {
    setCoordinates(null);
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
    >
      <DraggableItem id="item-1">Item 1</DraggableItem>
      <DraggableItem id="item-2">Item 2</DraggableItem>
      <DragOverlay adjustScale>
        {activeId && coordinates && (
          <div
            style={{
              transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
            }}
          >
            <DraggableItem id={activeId}>{activeId}</DraggableItem>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default DragAndDropComponent;
