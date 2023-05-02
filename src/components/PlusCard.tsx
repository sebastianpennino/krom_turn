import React, { useState } from "react";
import { getRandomCharacterName } from "../utils/names";

type PlusCardProps = {
  addFn: (newCharName: string) => void;
};

const PlusCard: React.FC<PlusCardProps> = ({ addFn }: PlusCardProps) => {
  const [charName, setName] = useState<string>("Edit my name!");

  const addChar = () => {
    addFn(charName);
    setName(getRandomCharacterName());
  };

  return (
    <div className="bg-trasnparent border border-dashed rounded-lg shadow-md flex">
      <div className="w-4/5 relative p-4">
        <input
          type="text"
          className="text-lg font-semibold mb-2 w-full bg-transparent"
          value={charName}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className="flex space-x-2 mt-2">
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="h-4 w-4 bg-gray-700 rounded-full"></div>
          ))}
        </div>
        <div className="flex space-x-2 mt-2">
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="h-4 w-4 bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>
      <button
        className="w-1/5 flex flex-col bg-gray-700 rounded-lg rounded-l-none items-center justify-center"
        onClick={addChar}
      >
        <span className="text-white text-3xl leading-none">+</span>
      </button>
    </div>
  );
};

export default PlusCard;
