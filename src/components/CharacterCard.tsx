import React from "react";

export interface Character {
  id: string;
  name: string;
  reflexValue: number;
  paPoints: number;
  prPoints: number;
}

interface CharacterCardProps {
  character: Character;
  changePA: (id: string) => void;
  changePR: (id: string) => void;
  disabled: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  changePA,
  changePR,
  disabled,
}) => {
  const handleRedClick = () => {
    changePA(character.id);
  };

  const handleBlueClick = () => {
    changePR(character.id);
  };

  const max = 2;

  return (
    <div className="bg-neutral-950 rounded-lg shadow-lg flex">
      <div className="w-9/12 p-2">
        <h3 className="text-sm">{character.name}</h3>
        <div className="mt-2 flex space-x-2">
          <button
            className="bg-red-800 flex space-x-2 p-2 focus:outline-none"
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
            className="bg-blue-800 flex space-x-2 p-2 focus:outline-none"
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
          <button
            className="bg-lime-800 flex space-x-2 p-2 focus:outline-none"
            onClick={handleBlueClick}
            disabled={disabled}
          >
            {Array.from({ length: character.prPoints }, (_, index) => (
              <div
                key={index}
                className="h-4 w-4 bg-lime-600 rounded-full"
              ></div>
            ))}
            {Array.from({ length: max - character.prPoints }, (_, index) => (
              <div
                key={index}
                className="h-4 w-4 bg-lime-950 rounded-full"
              ></div>
            ))}
          </button>
        </div>
      </div>
      <div className="w-3/12">
        <div className="text-sm h-full">
          <button
            className="w-1/2 bg-red-700 h-1/2 p-0 rounded-r-none rounded-b-none"
            disabled={disabled}
          >
            255
          </button>
          <button
            className="w-1/2 bg-blue-700 h-1/2 p-0 rounded-l-none rounded-b-none"
            disabled={disabled}
          >
            255
          </button>
          <button
            className="w-full bg-lime-700 h-1/2 p-0 rounded-t-none"
            disabled={disabled}
          >
            255
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
