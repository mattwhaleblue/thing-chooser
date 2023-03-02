"use client";
import React from "react";

import { Buttons } from "./components/Buttons";
import { Scores } from "./components/Scores";
import { useGame } from "./hooks";

const Page = () => {
  const {
    timeRemaining,
    isRunning,
    currentScore,
    scores,
    verb,
    guess,
    setGuess,
    next,
    isCorrect,
  } = useGame();

  return (
    <div className="grid gap-8 mx-4 md:mx-96 w-full">
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <div className="flex justify-between">
          <div>
            <p className="capitalize text-green-400">{verb.tense}</p>
            <p className="font-bold capitalize text-4xl">{verb.name}</p>
          </div>
          {timeRemaining}
        </div>
        <div className="text-5xl flex gap-4 items-center h-32 max-w-full">
          <p>{verb.conjugation}</p>
          {!isCorrect ? (
            <p className="text-red-400">{verb.verb}</p>
          ) : (
            <input
              type="text"
              placeholder="..."
              className="bg-transparent overflow-scroll border-b-2 border-white py-2 px-4 outline-none"
              disabled={!isRunning}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          )}
        </div>
        <Buttons isCorrect={isCorrect} isRunning={isRunning} />
      </form>

      <hr />

      <Scores currentScore={currentScore} scores={scores} />
    </div>
  );
};

export default Page;
