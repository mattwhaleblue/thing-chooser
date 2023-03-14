import React from "react";

import { useTimer } from "react-timer-hook";

import { createScoreRow, createScoresArray, createVerb, init } from "../utils";

// const initScores = JSON.parse(localStorage.getItem("scores") as string);
// const initWrong = JSON.parse(localStorage.getItem("wrong") as string) || [];
const initScores = "";
const initWrong = [""];

const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

export const useGame = () => {
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: time,
    });

  const timeRemaining = `${minutes}:${seconds}`;

  const [verb, setVerb] = React.useState(init);
  const [wrong, setWrong] = React.useState<typeof init[]>(initWrong);

  const [guess, setGuess] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(true);

  const [currentScore, setCurrentScore] = React.useState(0);
  const [inARow, setInARow] = React.useState(0);
  const [scores, setScores] = React.useState<
    ReturnType<typeof createScoreRow>[]
  >(initScores || []);

  const resetRound = (): any => {
    setGuess("");
    const num = Math.random();
    if (num > 0.75 && wrong.length) {
      const result = wrong[0];
      setVerb(result);
      return setIsCorrect(true);
    }

    const result = createVerb();
    if (result.verb === "") {
      return resetRound();
    }
    setVerb(result);
    return setIsCorrect(true);
  };

  const resetGame = () => {
    resetRound();
    setScores(createScoresArray(currentScore, inARow, scores));
    localStorage.setItem("wrong", JSON.stringify(wrong));
    setCurrentScore(0);
    setInARow(0);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + 600); // 10 minutes timer
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
      const idx = wrong.findIndex((v) => v.name === verb.name);

      if (idx !== -1) {
        setWrong((prev) => {
          const newWrongs = [...prev];
          newWrongs.splice(idx, 1);
          return newWrongs;
        });
      }
      resetRound();
      setInARow((prev) => prev + 1);
      return setCurrentScore((prev) => prev + 2);
    }

    const idx = wrong.findIndex((v) => v.name === verb.name);
    if (idx === -1) {
      setWrong((prev) => [...prev, verb]);
    }
    setIsCorrect(false);
    setInARow(0);
    return setCurrentScore((prev) => prev - 1);
  };

  return {
    timeRemaining,
    isRunning,
    currentScore,
    inARow,
    scores,
    guess,
    setGuess,
    verb,
    next,
    isCorrect,
  };
};
