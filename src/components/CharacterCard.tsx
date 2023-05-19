import React, { useState } from "react";
import { ReactComponent as ResetIcon } from "../assets/icon-reset.svg";
import { ReactComponent as DownOpenIcon } from "../assets/icon-down-open.svg";
import { ReactComponent as AddIcon } from "../assets/icon-add.svg";
import { ReactComponent as CancelIcon } from "../assets/icon-cancel.svg";
import { ReactComponent as AddUserIcon } from "../assets/icon-user-add.svg";
import { ReactComponent as ArrowFwdIcon } from "../assets/icon-arrow-forward.svg";
import { ReactComponent as ArrowBwdIcon } from "../assets/icon-arrow-backward.svg";
import { ReactComponent as HourglassIcon } from "../assets/icon-hourglass.svg";
import { ReactComponent as MoveUpDownLockIcon } from "../assets/icon-move-up-down-lock.svg";
import { ReactComponent as MoveUpDownIcon } from "../assets/icon-move-up-down.svg";
import { ReactComponent as RemoveIcon } from "../assets/icon-remove.svg";
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
  life: number;
  mana: number;
  stamina: number;
}

interface CharacterCardProps {
  character: Character;
  changePA: (id: string) => void;
  changePR: (id: string) => void;
  changeLife: (id: string) => void;
  changeMana: (id: string) => void;
  changeStamina: (id: string) => void;
  resetSources: (id: string) => void;
  disabled: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  changePA,
  changePR,
  changeLife,
  changeMana,
  changeStamina,
  resetSources,
  disabled,
}) => {
  const [expanded, setExpand] = useState<boolean>(false);

  const handleRedClick = () => {
    changePA(character.id);
  };

  const handleBlueClick = () => {
    changePR(character.id);
  };

  const handleLifeHit = () => {
    changeLife(character.id);
  };
  const handleManaHit = () => {
    changeMana(character.id);
  };
  const handleStaminaHit = () => {
    changeStamina(character.id);
  };

  const handleReset = () => {
    resetSources(character.id);
  };

  const handleExpand = () => {
    setExpand(!expanded);
  };

  const max = 2;

  return (
    <div className="bg-neutral-950 rounded-lg shadow-lg flex-col">
      <div className="flex">
        <div className="w-9/12 p-2">
          <h3 className="text-sm">{character.name}</h3>
          <div className="mt-2 space-x-2 text-sm flex">
            <button
              className="bg-rose-800 text-rose-400 py-0 px-0 w-1/6"
              onClick={handleLifeHit}
              disabled={disabled}
            >
              {character.life}
            </button>
            <button
              className="bg-sky-800 text-sky-400 py-0 px-0 w-1/6"
              onClick={handleManaHit}
              disabled={disabled}
            >
              {character.mana}
            </button>
            <button
              className="bg-lime-800 text-lime-400 py-0 px-0 w-1/6"
              onClick={handleStaminaHit}
              disabled={disabled}
            >
              {character.stamina}
            </button>
            <button
              className="bg-stone-800 text-stone-400 py-0 px-8 flex items-center justify-items-center"
              onClick={handleExpand}
              disabled={disabled}
            >
              <DownOpenIcon />
            </button>
          </div>
        </div>
        <div className="w-3/12">
          <div className="flex h-full justify-end">
            <button
              className="bg-red-800 h-full flex flex-col justify-around p-2 focus:outline-none rounded-r-none"
              onClick={handleRedClick}
              disabled={disabled}
            >
              {Array.from({ length: character.paPoints }, (_, index) => (
                <div
                  key={index}
                  className="h-4 w-4 bg-red-600 rounded-full"
                ></div>
              ))}
              {Array.from({ length: max - character.paPoints }, (_, index) => (
                <div
                  key={index}
                  className="h-4 w-4 bg-red-950 rounded-full"
                ></div>
              ))}
            </button>
            <button
              className="bg-blue-800 h-full flex flex-col justify-around p-2 focus:outline-none rounded-l-none"
              onClick={handleBlueClick}
              disabled={disabled}
            >
              {Array.from({ length: character.prPoints }, (_, index) => (
                <div
                  key={index}
                  className="h-4 w-4 bg-blue-600 rounded-full"
                ></div>
              ))}
              {Array.from({ length: max - character.prPoints }, (_, index) => (
                <div
                  key={index}
                  className="h-4 w-4 bg-blue-950 rounded-full"
                ></div>
              ))}
            </button>
          </div>
        </div>
      </div>
      {expanded && (
       <div className="rounded-lg p-0 h-10 mb-4 sticky bottom-0 flex justify-center">
       <button className="w-1/4 bg-red-900 flex items-center justify-center rounded-lg rounded-r-none">
         <CheckMarkIcon />
       </button>
       <button className="w-1/4 bg-blue-900 flex items-center justify-center rounded-none">
         <CheckMarkFillIcon />
       </button>
       <button className="w-1/4 bg-lime-900 flex items-center justify-center rounded-none">
         <ArrowBwdIcon />
       </button>
       {/* <button className="w-1/4 bg-sky-900 flex items-center justify-center rounded-none">
         <CheckMarkFillIcon />
       </button>
       <button className="w-1/6 bg-rose-900 flex items-center justify-center rounded-none">
         <RemoveIcon />
       </button> */}
       <button className="w-1/4 bg-yellow-900 flex items-center justify-center rounded-lg rounded-l-none">
         <CancelIcon />
       </button>
     </div>
      )}
    </div>
  );
};

export default CharacterCard;
