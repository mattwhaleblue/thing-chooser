import React from "react";

import { Buttons } from "../Buttons";

import { Scores } from "../Scores";
import { Item, useGame } from "./hooks";

type Props<T> = {
  data: T[];
  init: Item;
  createItem: (data: T[]) => Item;
};

export const Flash = <T,>(props: Props<T>) => {
  const {
    timeRemaining,
    isRunning,
    currentScore,
    inARow,
    highestInARow,
    scores,
    item,
    guess,
    setGuess,
    next,
    isCorrect,
  } = useGame(props.data, props.createItem, props.init);

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
            <p className="capitalize text-green-400">{item.topText}</p>
            <p className="font-bold capitalize text-4xl">{item.option}</p>
          </div>
          {timeRemaining}
        </div>
        <div className="text-5xl flex gap-4 items-center h-32 max-w-full">
          {item.bottomText && <p>{item.bottomText}</p>}
          {!isCorrect ? (
            <p className="text-red-400">{item.answer}</p>
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

      <Scores currentScore={currentScore} inARow={inARow} highestInARow={highestInARow} scores={scores} />
    </div>
  );
};
