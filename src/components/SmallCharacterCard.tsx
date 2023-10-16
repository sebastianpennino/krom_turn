import React from "react";

export interface Character {
  id: string;
  name: string;
}

interface SmallCharacterCardProps {
  character: Character;
}

const SmallCharacterCard: React.FC<SmallCharacterCardProps> = ({
  character,
}) => {
  return (
    <div className="bg-neutral-900 rounded-lg shadow-md flex">
      <div className="w-4/5 p-2">
        <h3 className="text-sm">{character.name}</h3>
      </div>
    </div>
  );
};

export default SmallCharacterCard;
