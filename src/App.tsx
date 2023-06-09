import React, { Reducer, useReducer } from "react";
import CharacterCard, { Character } from "./components/CharacterCard";
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
import PlusCard from "./components/PlusCard";
import SmallCharacterCard from "./components/SmallCharacterCard";
import ToolBar from "./components/ToolBar";

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
  hasCombatStarted: boolean;
  turn: number;
};

const initialState: AppState = {
  characters: [], // getFakeCharacterCardData(10),
  hasCombatStarted: false,
  turn: 1,
};

export enum TurnTrackerAction {
  REORDER_AFTER_DRAG = "REORDER_AFTER_DRAG",
  SHUFFLE_CHARACTERS = "SHUFFLE_CHARACTERS",
  RESET_POINTS = "RESET_POINTS",
  INCREASE_TURN = "INCREASE_TURN",
  CHANGE_PA = "CHANGE_PA",
  CHANGE_PR = "CHANGE_PR",
  CHANGE_LIFE = "CHANGE_LIFE",
  CHANGE_MANA = "CHANGE_MANA",
  RESET_SOURCES = "RESET_SOURCES",
  KILL_CHARACTER = "KILL_CHARACTER",
  TOGGLE_TIMER = "TOGGLE_TIMER",
  CHANGE_STAMINA = "CHANGE_STAMINA",
  ADD_CHARACTER = "ADD_CHARACTER",
  TOGGLE_COMBAT = "TOGGLE_COMBAT",
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
    case TurnTrackerAction.INCREASE_TURN: {
      return {
        ...state,
        turn: state.turn + 1,
      };
    }
    case TurnTrackerAction.CHANGE_LIFE: {
      const foundIndex = state.characters.findIndex((char) => {
        return char.id === action.payload;
      });
      if (foundIndex !== -1) {
        const copyCharacter = {
          ...state.characters[foundIndex],
        };
        copyCharacter.life = copyCharacter.life - 1;

        const newChars = [...state.characters];
        newChars[foundIndex] = copyCharacter;
        return {
          ...state,
          characters: newChars,
        };
      }
      return state;
    }
    case TurnTrackerAction.CHANGE_MANA: {
      const foundIndex = state.characters.findIndex((char) => {
        return char.id === action.payload;
      });
      if (foundIndex !== -1) {
        const copyCharacter = {
          ...state.characters[foundIndex],
        };
        copyCharacter.mana = copyCharacter.mana - 5;

        const newChars = [...state.characters];
        newChars[foundIndex] = copyCharacter;
        return {
          ...state,
          characters: newChars,
        };
      }
      return state;
    }
    case TurnTrackerAction.CHANGE_STAMINA: {
      const foundIndex = state.characters.findIndex((char) => {
        return char.id === action.payload;
      });
      if (foundIndex !== -1) {
        const copyCharacter = {
          ...state.characters[foundIndex],
        };
        copyCharacter.stamina = copyCharacter.stamina - 10;

        const newChars = [...state.characters];
        newChars[foundIndex] = copyCharacter;
        return {
          ...state,
          characters: newChars,
        };
      }
      return state;
    }
    case TurnTrackerAction.RESET_SOURCES: {
      const foundIndex = state.characters.findIndex((char) => {
        return char.id === action.payload;
      });
      if (foundIndex !== -1) {
        const copyCharacter = {
          ...state.characters[foundIndex],
          life: 0,
          stamina: 0,
          mana: 0,
        };

        const newChars = [...state.characters];
        newChars[foundIndex] = copyCharacter;
        return {
          ...state,
          characters: newChars,
        };
      }
      return state;
    }
    case TurnTrackerAction.KILL_CHARACTER: {
      const foundIndex = state.characters.findIndex((char) => {
        return char.id === action.payload;
      });
      if (foundIndex !== -1) {
        const copyCharacter = {
          ...state.characters[foundIndex],
          died: true,
        };

        const newChars = [...state.characters];
        newChars[foundIndex] = copyCharacter;
        return {
          ...state,
          characters: newChars,
        };
      }
      return state;
    }
    case TurnTrackerAction.TOGGLE_TIMER: {
      const foundIndex = state.characters.findIndex((char) => {
        return char.id === action.payload;
      });
      if (foundIndex !== -1) {
        const currentTimer = state.characters[foundIndex].timer;
        const copyCharacter = {
          ...state.characters[foundIndex],
          timer: currentTimer > 0 ? 0 : state.turn,
        };

        const newChars = [...state.characters];
        newChars[foundIndex] = copyCharacter;
        return {
          ...state,
          characters: newChars,
        };
      }
      return state;
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
    case TurnTrackerAction.ADD_CHARACTER: {
      const newChar = getFakeCharacterCardData(1)[0];
      newChar.name = action.payload;
      return {
        ...state,
        characters: [...state.characters, newChar],
      };
    }
    case TurnTrackerAction.TOGGLE_COMBAT: {
      return {
        ...state,
        hasCombatStarted: true,
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

  const changeLife = (id: string) => {
    dispatch({
      type: TurnTrackerAction.CHANGE_LIFE,
      payload: id,
    });
  };

  const changeMana = (id: string) => {
    dispatch({
      type: TurnTrackerAction.CHANGE_MANA,
      payload: id,
    });
  };

  const changeStamina = (id: string) => {
    dispatch({
      type: TurnTrackerAction.CHANGE_STAMINA,
      payload: id,
    });
  };

  const resetSources = (id: string) => {
    dispatch({
      type: TurnTrackerAction.RESET_SOURCES,
      payload: id,
    });
  };

  const killCharacter = (id: string) => {
    dispatch({
      type: TurnTrackerAction.KILL_CHARACTER,
      payload: id,
    });
  };

  const toggleTimer = (id: string) => {
    dispatch({
      type: TurnTrackerAction.TOGGLE_TIMER,
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

  const increaseTurn = () => {
    dispatch({
      type: TurnTrackerAction.INCREASE_TURN,
      payload: null,
    });
  };

  const addCharacter = (newName: string) => {
    dispatch({
      type: TurnTrackerAction.ADD_CHARACTER,
      payload: newName,
    });
  };

  const toggleCombat = () => {
    dispatch({
      type: TurnTrackerAction.TOGGLE_COMBAT,
      payload: null,
    });
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-stone-950 sticky top-0">
        <div className="text-white">
          <KromsysLogo />
        </div>
        <div>
          <h1 className="text-sm">
            Kromsys Turn Tracker {state.turn > 0 ? `(${state.turn})` : ""}
          </h1>
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
              <>
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {!state.hasCombatStarted && <PlusCard addFn={addCharacter} />}

                  {state.characters
                    .filter((char: Character) => !char.died)
                    .map((char: Character, index: number) => (
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
                            {state.hasCombatStarted ? (
                              <CharacterCard
                                character={{
                                  id: char.id,
                                  name: char.name,
                                  reflexValue: char.reflexValue,
                                  paPoints: char.paPoints,
                                  prPoints: char.prPoints,
                                  life: char.life,
                                  mana: char.mana,
                                  stamina: char.stamina,
                                  died: char.died,
                                  timer: char.timer,
                                  ascTimer: char.ascTimer,
                                }}
                                changePA={changePA}
                                changePR={changePR}
                                changeLife={changeLife}
                                changeMana={changeMana}
                                changeStamina={changeStamina}
                                resetSources={resetSources}
                                toggleTimer={toggleTimer}
                                killCharacter={killCharacter}
                                disabled={!state.hasCombatStarted}
                                currentTurn={state.turn}
                              />
                            ) : (
                              <SmallCharacterCard
                                character={{
                                  id: char.id,
                                  name: char.name,
                                  reflexValue: char.reflexValue,
                                  paPoints: char.paPoints,
                                  prPoints: char.prPoints,
                                }}
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>

                <ToolBar
                  hasCombatStarted={state.hasCombatStarted}
                  players={state.characters.length}
                  toggleCombat={toggleCombat}
                  resetPoints={resetPoints}
                  shuffleCharacters={shuffleCharacters}
                  increaseTurn={increaseTurn}
                />

                {!state.hasCombatStarted && state.characters.length <= 2 && (
                  <p className="mb-4">
                    Add characters by editing the name and then pressing the (+)
                    sign, once you're over, press the start combat button
                  </p>
                )}
              </>
            )}
          </Droppable>
        </DragDropContext>
      </main>

      {/* Footer */}
      <footer className="bg-stone-950 py-4 px-4 flex justify-center">
        <a href="https://github.com/sebastianpennino" title="author">
          By Cronos © {currentYear}
        </a>
        {/* 
        {state.hasCombatStarted ? (
          <>
            <button
              className="w-1/2 px-4 py-2 text-white text-sm mr-4"
              onClick={shuffleCharacters}
            >
              Shuffle Order
            </button>
            <button
              className="w-1/2 px-4 py-2 text-white text-sm"
              onClick={resetPoints}
            >
              Reset Points
            </button>
          </>
        ) : (
          <button
            className="w-full px-4 py-2 text-white text-sm"
            onClick={toggleCombat}
            disabled={state.characters.length < 2}
          >
            Start Combat!
          </button>
        )}
         */}
      </footer>
    </div>
  );
};

export default App;
