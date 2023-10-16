import React, { Reducer, useEffect, useReducer } from "react";
import { Character } from "./components/CharacterCard";
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
import { reorderArray, shuffleArray } from "./utils/utils";
import SmallCharacterCard from "./components/SmallCharacterCard";

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  userSelect: "none",
  border: isDragging ? "1px solid rgb(31 41 55)" : "1px solid transparent",
  borderRadius: "10px",
  boxShadow: isDragging
    ? "0px 0px 6px 6px rgba(255,255,255,0.25)"
    : "0px 0px 0 0 rgba(0,0,0,0.3)",

  // Styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  // background: isDraggingOver ? "lightblue" : "transparent",
  // border: isDraggingOver ? "3px dotted firebrick" : "3px solid transparent"
});

type AppState = {
  characters: Character[];
};

const initialState: AppState = {
  characters: [
    {
      id: "11",
      name: "Talentos",
    },
    {
      id: "12",
      name: "Historial",
    },
    {
      id: "13",
      name: "Caracteristicas",
    },
    {
      id: "14",
      name: "Clase",
    },
    {
      id: "15",
      name: "Habilidades",
    },
  ], // getFakeCharacterCardData(5),
};

export enum TurnTrackerAction {
  REORDER_AFTER_DRAG = "REORDER_AFTER_DRAG",
  SHUFFLE_CHARACTERS = "SHUFFLE_CHARACTERS",
}

export type AppAction = {
  type: TurnTrackerAction;
  payload: any;
};

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case TurnTrackerAction.REORDER_AFTER_DRAG: {
      return {
        ...state,
        characters: action.payload,
      };
    }
    case TurnTrackerAction.SHUFFLE_CHARACTERS: {
      return {
        ...state,
        characters: action.payload,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
};

const App = () => {
  const currentYear = new Date().getFullYear();

  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(
    appReducer,
    initialState
  );

  const onDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const updatedItems = reorderArray(
      state.characters,
      result.source.index,
      result.destination.index
    );

    const reorderChars = (payload: any) => {
      dispatch({
        type: TurnTrackerAction.REORDER_AFTER_DRAG,
        payload,
      });
    };

    reorderChars(updatedItems);
  };

  const shuffleCharacters = () => {
    const shuffledCharacters = shuffleArray(state.characters);

    dispatch({
      type: TurnTrackerAction.SHUFFLE_CHARACTERS,
      payload: shuffledCharacters,
    });
  };

  useEffect(() => {
    shuffleCharacters();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-between">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-stone-950 sticky top-0">
        <div className="text-white">
          <KromsysLogo />
        </div>
        <div>
          <h1 className="text-sm">Kromsys Character Creator - Priority Step</h1>
        </div>
        <button className="text-white p-0">
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

      {/* Main Content */}
      <main className="flex-grow p-4 overflow-x-auto pb-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div className="flex justify-center">
                <div className="w-1/3 md:w-1/6 lg:w-1/6 bg-gray-200 p-4 m-2 rounded-lg shadow-md">
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "21",
                        name: "Priority A",
                      }}
                    />
                  </div>
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "22",
                        name: "Priority B",
                      }}
                    />
                  </div>
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "23",
                        name: "Priority C",
                      }}
                    />
                  </div>
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "24",
                        name: "Priority D",
                      }}
                    />
                  </div>
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "25",
                        name: "Priority E",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="w-1/3 md:w-5/6 lg:w-5/6 bg-gray-200 p-4 m-2 rounded-lg shadow-md"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state.characters.map((char: Character, index: number) => (
                    <Draggable
                      key={char.id}
                      draggableId={char.id}
                      index={index}
                    >
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
                          <SmallCharacterCard
                            character={{
                              id: char.id,
                              name: char.name,
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <div className="w-1/3 md:w-1/6 lg:w-1/6 bg-gray-200 p-4 m-2 rounded-lg shadow-md">
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "41",
                        name: "za",
                      }}
                    />
                  </div>
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "42",
                        name: "zb",
                      }}
                    />
                  </div>
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "43",
                        name: "zc",
                      }}
                    />
                  </div>
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "44",
                        name: "zd",
                      }}
                    />
                  </div>
                  <div className="mb-4 transition-shadow transition-border duration-500">
                    <SmallCharacterCard
                      character={{
                        id: "45",
                        name: "ze",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>

      {/* Footer */}
      <footer className="bg-stone-950 py-4 px-4 flex justify-center">
        <a href="https://github.com/sebastianpennino" title="author">
          By Cronos © {currentYear}
        </a>
      </footer>
    </div>
  );
};

export default App;
