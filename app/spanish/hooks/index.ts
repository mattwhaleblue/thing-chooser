import React from "react";

import { useTimer } from "react-timer-hook";

import { createScoreRow, createScoresArray, createVerb, init } from "../utils";

// const initScores = JSON.parse(localStorage.getItem("scores") as string);

const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

export const useGame = () => {
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: time,
    });

  const timeRemaining = `${minutes}:${seconds}`;

  const [verb, setVerb] = React.useState(init);

  const [guess, setGuess] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(true);

  const [currentScore, setCurrentScore] = React.useState(0);
  const [scores, setScores] = React.useState<
    ReturnType<typeof createScoreRow>[]
  >([]);

  const resetRound = () => {
    setGuess("");
    const result = createVerb();
    setVerb(result);
    setIsCorrect(true);
  };

  const resetGame = () => {
    resetRound();
    setScores(createScoresArray(currentScore, scores));
    setCurrentScore(0);
    const newTime = new Date();
    newTime.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    restart(newTime);
  };

  const next = () => {
    if (!isRunning) {
      return resetGame();
    }

    if (!isCorrect) {
      return resetRound();
    }

    if (verb.verb === guess) {
      resetRound();
      return setCurrentScore((prev) => prev + 2);
    }

    setIsCorrect(false);
    return setCurrentScore((prev) => prev - 1);
  };

  return {
    timeRemaining,
    isRunning,
    currentScore,
    scores,
    guess,
    setGuess,
    verb,
    next,
    isCorrect,
  };
};
