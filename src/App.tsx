import React from "react";
import CharacterCard from "./components/CharacterCard";
import { ReactComponent as KromsysLogo } from "./assets/k-logo.svg";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-2 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-white">
            <KromsysLogo />
          </div>
          <h1 className="text-lg font-bold text-center">
            Kromsys Turn Tracker
          </h1>
        </div>
        <button className="text-white">
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
      <main className="flex-grow p-4 overflow-x-auto">
        <CharacterCard
          character={{
            name: "Character 1",
            turnOrder: 1,
            reflexValue: 5,
            paPoints: 2,
            prPoints: 0,
          }}
        />
        <CharacterCard
          character={{
            name: "Character 2",
            turnOrder: 2,
            reflexValue: 2,
            paPoints: 2,
            prPoints: 1,
          }}
        />
        <CharacterCard
          character={{
            name: "Character 3",
            turnOrder: 3,
            reflexValue: 3,
            paPoints: 2,
            prPoints: 1,
          }}
        />
        <CharacterCard
          character={{
            name: "Character 4",
            turnOrder: 3,
            reflexValue: 3,
            paPoints: 1,
            prPoints: 2,
          }}
        />
        <CharacterCard
          character={{
            name: "Character 5",
            turnOrder: 3,
            reflexValue: 3,
            paPoints: 1,
            prPoints: 1,
          }}
        />
        <CharacterCard
          character={{
            name: "Character 6",
            turnOrder: 3,
            reflexValue: 3,
            paPoints: 0,
            prPoints: 2,
          }}
        />
        <CharacterCard
          character={{
            name: "Character 7",
            turnOrder: 3,
            reflexValue: 3,
            paPoints: 1,
            prPoints: 0,
          }}
        />
      </main>
      <footer className="bg-gray-800 text-white py-4 px-6 flex justify-between sticky bottom-0">
        <button className="bg-lime-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 mr-2">
          Shuffle
        </button>
        <button className="bg-lime-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2">
          Pass Turn
        </button>
      </footer>
    </div>
  );
};

export default App;
