import React from "react";

interface Character {
  name: string;
  turnOrder: number;
  reflexValue: number;
  paPoints: number;
  prPoints: number;
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const handleRedClick = () => {
    console.log("red");
  };

  const handleBlueClick = () => {
    console.log("blue");
  };

  const max = 2;

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md mb-4 flex">
      <div className="w-4/5 relative p-4">
        <h3 className="text-lg font-semibold mb-2">{character.name}</h3>
        <p className="absolute bottom-0 right-0 text-sm font-medium text-gray-400 p-4">
          (R: {character.reflexValue})
        </p>
        <div className="flex space-x-2 mt-2">
          {Array.from({ length: character.paPoints }, (_, index) => (
            <div key={index} className="h-4 w-4 bg-red-700 rounded-full"></div>
          ))}
          {Array.from({ length: max - character.paPoints }, (_, index) => (
            <div key={index} className="h-4 w-4 bg-gray-700 rounded-full"></div>
          ))}
        </div>
        <div className="flex space-x-2 mt-2">
          {Array.from({ length: character.prPoints }, (_, index) => (
            <div key={index} className="h-4 w-4 bg-blue-700 rounded-full"></div>
          ))}
          {Array.from({ length: max - character.prPoints }, (_, index) => (
            <div key={index} className="h-4 w-4 bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>
      <div className="w-1/5 flex flex-col">
        <button
          className="flex-grow bg-red-700 rounded-l-none rounded-b-none cursor-pointer"
          onClick={handleRedClick}
        ></button>
        <button
          className="flex-grow bg-blue-700 rounded-l-none rounded-t-none cursor-pointer"
          onClick={handleBlueClick}
        ></button>
      </div>
    </div>
  );
};

export default CharacterCard;
