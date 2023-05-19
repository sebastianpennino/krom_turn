import React, { Reducer, useReducer } from "react";
import { ReactComponent as AddIcon } from "../assets/icon-add.svg";
import { ReactComponent as CancelIcon } from "../assets/icon-cancel.svg";
import { ReactComponent as AddUserIcon } from "../assets/icon-user-add.svg";
import { ReactComponent as ArrowFwdIcon } from "../assets/icon-arrow-forward.svg";
import { ReactComponent as ArrowBwdIcon } from "../assets/icon-arrow-backward.svg";
import { ReactComponent as DownOpenIcon } from "../assets/icon-down-open.svg";
import { ReactComponent as HourglassIcon } from "../assets/icon-hourglass.svg";
import { ReactComponent as MoveUpDownLockIcon } from "../assets/icon-move-up-down-lock.svg";
import { ReactComponent as MoveUpDownIcon } from "../assets/icon-move-up-down.svg";
import { ReactComponent as RemoveIcon } from "../assets/icon-remove.svg";
import { ReactComponent as ResetIcon } from "../assets/icon-reset.svg";
import { ReactComponent as SettingIcon } from "../assets/icon-setting.svg";
import { ReactComponent as ShuffleIcon } from "../assets/icon-shuffle.svg";
import { ReactComponent as SkullIcon } from "../assets/icon-skull.svg";
import { ReactComponent as ThunderIcon } from "../assets/icon-thunder.svg";
import { ReactComponent as ToolIcon } from "../assets/icon-tool.svg";
import { ReactComponent as CheckMarkIcon } from "../assets/icon-checkmark.svg";
import { ReactComponent as CheckMarkFillIcon } from "../assets/icon-checkmark-fill.svg";

export interface Character {
  id: string;
  name: string;
  reflexValue: number;
  paPoints: number;
  prPoints: number;
}

interface ToolBarProps {
  hasCombatStarted: boolean;
  players: number;
  toggleCombat: () => void;
  shuffleCharacters: () => void;
  resetPoints: () => void;
  increaseTurn: () => void;
}

type ToolBarState = {
  skullPressed: boolean;
};

enum ToolBarAction {
  PRESS_SKULL = "PRESS_SKULL",
}

type ToolBarAppAction = {
  type: ToolBarAction;
  payload: any;
};

const initialState: ToolBarState = {
  skullPressed: false,
};

const toolbarReducer = (state: ToolBarState, action: ToolBarAppAction) => {
  switch (action.type) {
    case ToolBarAction.PRESS_SKULL:
      const newState = {
        ...state,
        skullPressed: !state.skullPressed,
      };
      return newState;
    default:
      return state;
      break;
  }
};

const ToolBar: React.FC<ToolBarProps> = ({
  hasCombatStarted,
  players,
  toggleCombat,
  shuffleCharacters,
  resetPoints,
  increaseTurn,
}) => {
  const [state, dispatch] = useReducer<Reducer<ToolBarState, ToolBarAppAction>>(
    toolbarReducer,
    initialState
  );

  const pressSkull = () => {
    dispatch({
      type: ToolBarAction.PRESS_SKULL,
      payload: null,
    });
  };

  const startCombat = () => {
    if (players > 0) {
      toggleCombat();
    }
  };

  return (
    <div className="rounded-lg p-0 h-10 mb-4 sticky bottom-0 flex justify-center">
      {!hasCombatStarted ? (
        <>
          <button
            className="w-full bg-red-900 flex items-center justify-center rounded-lg"
            onClick={startCombat}
          >
            <span className="mr-2">Start Combat</span>
            <CheckMarkIcon />
          </button>
        </>
      ) : (
        <>
          <button
            className="w-1/3 bg-indigo-900 flex items-center justify-center rounded-lg rounded-r-none"
            onClick={shuffleCharacters}
          >
            <span className="mr-2">Shuffle</span>
            <ShuffleIcon />
          </button>
          <button
            className="w-1/3 bg-rose-900 flex items-center justify-center rounded-none"
            onClick={resetPoints}
          >
            <span className="mr-2">Points</span>
            <ResetIcon />
          </button>
          <button
            className="w-1/3 bg-teal-900 flex items-center justify-center rounded-lg rounded-l-none"
            onClick={increaseTurn}
          >
            <ArrowFwdIcon />
          </button>
          
        </>
      )}
    </div>
  );
};

export default ToolBar;
