import React, { useState } from "react";
import CharacterCard from "./components/CharacterCard";
import { ReactComponent as KromsysLogo } from "./assets/k-logo.svg";
import {
  DragDropContext,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./components/StrictModeDroppable";
import { getFakeCharacterCardData, reorderArray } from "./utils/utils";

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  userSelect: "none",
  border: isDragging ? "1px solid rgb(31 41 55)" : "1px solid transparent",
  borderRadius: "10px",
  boxShadow: isDragging ? "0px 0px 6px 6px rgba(255,255,255,0.25)" : "0px 0px 0 0 rgba(0,0,0,0.3)",

  // Styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  // background: isDraggingOver ? "lightblue" : "transparent",
  // border: isDraggingOver ? "3px dotted firebrick" : "3px solid transparent"
});

interface Character {
  id: string;
  content: string;
  name: string;
  turnOrder: number;
  reflexValue: number;
  paPoints: number;
  prPoints: number;
}

const App = () => {
  const [characters, setItems] = useState<Character[]>(() =>
    getFakeCharacterCardData(10)
  );

  const onDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const updatedItems = reorderArray(
      characters,
      result.source.index,
      result.destination.index
    );

    setItems(updatedItems);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-2 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-white">
            <KromsysLogo />
          </div>
          <h1 className="text-lg font-bold text-center">
            Kromsys Turn Tracker
          </h1>
        </div>
        <button className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>
      <main className="flex-grow p-4 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {characters.map((char: Character, index: number) => (
                  <Draggable key={char.id} draggableId={char.id} index={index}>
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className="mb-4 transition-shadow transition-border duration-500"
                      >
                        <CharacterCard
                          character={{
                            name: char.name,
                            turnOrder: char.turnOrder,
                            reflexValue: char.reflexValue,
                            paPoints: char.paPoints,
                            prPoints: char.prPoints,
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
      <footer className="bg-gray-800 text-white py-4 px-6 flex justify-between sticky bottom-0">
        <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded w-1/2 mr-2">
          Shuffle
        </button>
        <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded w-1/2">
          Pass Turn
        </button>
      </footer>
    </div>
  );
};

export default App;
