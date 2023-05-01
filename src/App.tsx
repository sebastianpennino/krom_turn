import React, { Reducer, useReducer } from "react";
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
import {
  getFakeCharacterCardData,
  reorderArray,
  shuffleArray,
} from "./utils/utils";

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

interface Character {
  id: string;
  content: string;
  name: string;
  turnOrder: number;
  reflexValue: number;
  paPoints: number;
  prPoints: number;
}

type AppState = {
  characters: Character[];
};

const initialState: AppState = {
  characters: getFakeCharacterCardData(10),
};

export enum TurnTrackerAction {
  REORDER_AFTER_DRAG = "REORDER_AFTER_DRAG",
  SHUFFLE_CHARACTERS = "SHUFFLE_CHARACTERS",
  RESET_POINTS = "RESET_POINTS",
  CHANGE_PA = "CHANGE_PA",
  CHANGE_PR = "CHANGE_PR",
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
    case TurnTrackerAction.RESET_POINTS: {
      const newChars = state.characters.map((char) => {
        return {
          ...char,
          paPoints: 0,
          prPoints: 0,
        };
      });
      return {
        ...state,
        characters: newChars,
      };
    }
    case TurnTrackerAction.CHANGE_PA: {
      const foundIndex = state.characters.findIndex((char) => {
        return char.id === action.payload;
      });
      if (foundIndex !== -1) {
        const copyCharacter = {
          ...state.characters[foundIndex],
        };
        copyCharacter.paPoints =
          copyCharacter.paPoints >= 2 ? 0 : copyCharacter.paPoints + 1;

        const newChars = [...state.characters];
        newChars[foundIndex] = copyCharacter;
        return {
          ...state,
          characters: newChars,
        };
      }
      return state;
    }
    case TurnTrackerAction.CHANGE_PR: {
      const foundIndex = state.characters.findIndex((char) => {
        return char.id === action.payload;
      });
      if (foundIndex !== -1) {
        const copyCharacter = {
          ...state.characters[foundIndex],
        };
        copyCharacter.prPoints =
          copyCharacter.prPoints >= 2 ? 0 : copyCharacter.prPoints + 1;

        const newChars = [...state.characters];
        newChars[foundIndex] = copyCharacter;
        return {
          ...state,
          characters: newChars,
        };
      }
      return state;
    }
  }
  throw Error("Unknown action: " + action.type);
};

const App = () => {
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

  const changePA = (id: string) => {
    dispatch({
      type: TurnTrackerAction.CHANGE_PA,
      payload: id,
    });
  };

  const changePR = (id: string) => {
    dispatch({
      type: TurnTrackerAction.CHANGE_PR,
      payload: id,
    });
  };

  const resetPoints = () => {
    dispatch({
      type: TurnTrackerAction.RESET_POINTS,
      payload: null,
    });
  };

  const shuffleCharacters = () => {
    const shuffledCharacters = shuffleArray(state.characters);

    dispatch({
      type: TurnTrackerAction.SHUFFLE_CHARACTERS,
      payload: shuffledCharacters,
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-stone-950 sticky top-0">
        <div className="text-white">
          <KromsysLogo />
        </div>
        <div>
          <h1 className="text-sm">Kromsys Turn Tracker</h1>
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
                {state.characters.map((char: Character, index: number) => (
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
                            id: char.id,
                            name: char.name,
                            turnOrder: char.turnOrder,
                            reflexValue: char.reflexValue,
                            paPoints: char.paPoints,
                            prPoints: char.prPoints,
                          }}
                          changePA={changePA}
                          changePR={changePR}
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

      {/* Footer */}
      <footer className="bg-stone-950 py-4 px-4 flex justify-center sticky bottom-0">
        <button
          className="w-1/2 px-4 py-2 text-white text-sm mr-4"
          onClick={shuffleCharacters}
        >
          Shuffle Order
        </button>
        <button
          className="w-1/2 px-4 py-2 text-white text-sm mr-4"
          onClick={resetPoints}
        >
          Reset Points
        </button>
      </footer>
    </div>
  );
};

export default App;
