import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import SortableItem from "./components/SortableItem";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const App = () => {
  const [languages, setLanguages] = useState([
    "JavaScript",
    "Python",
    "Typescript",
  ]);

  const handleDragEnd = (event) => {
    console.log("Drag End Called");
    const { active, over } = event;

    // console.log(active.id, over.id);
    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container className='p-3' style={{ width: "50%" }} align='center'>
        <h3>List</h3>
        <SortableContext
          items={languages}
          strategy={verticalListSortingStrategy}
        >
          {languages.map((language) => (
            <SortableItem key={language} id={language} />
          ))}
        </SortableContext>
      </Container>
    </DndContext>
  );
};

export default App;
