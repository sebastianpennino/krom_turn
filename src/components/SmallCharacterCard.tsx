import React from "react";

export interface Character {
  id: string;
  name: string;
  reflexValue: number;
  paPoints: number;
  prPoints: number;
}

interface SmallCharacterCardProps {
  character: Character;
}

const SmallCharacterCard: React.FC<SmallCharacterCardProps> = ({
  character,
}) => {
  return (
    <div className="bg-cyan-700 rounded-lg shadow-md p-2">
      <h3 className="text-sm">{character.name}</h3>
    </div>
  );
};

export default SmallCharacterCard;
