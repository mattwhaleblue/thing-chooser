import React from "react";

import { useTimer } from "react-timer-hook";

import { v4 as uuid } from "uuid";

export type Item = {
  option: string;
  answer: string;
  topText: string;
  bottomText: string;
};

export const createScoreRow = (score: number, inARow: number) => {
  return {
    id: uuid(),
    inARow,
    score,
    date: new Date().toDateString(),
  };
};

export const createScoresArray = (
  score: number,
  inARow: number,
  prev: ReturnType<typeof createScoreRow>[]
) => {
  const newArr = [...prev, createScoreRow(score, inARow)];

  const sortedArr = newArr.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(sortedArr));
  return sortedArr;
};

const initScores = "";
const initWrong: any[] = [];

const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

export const useGame = <T>(data: T[], fn: (data: T[]) => Item, init: Item) => {
  // const initScores = JSON.parse(localStorage.getItem("scores") as string);
  // const initWrong = JSON.parse(localStorage.getItem("wrong") as string) || [];
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: time,
    });

  const timeRemaining = `${minutes}:${seconds}`;

  const [item, setItem] = React.useState(init);
  const [wrong, setWrong] = React.useState<typeof init[]>(initWrong);

  const [guess, setGuess] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(true);

  const [currentScore, setCurrentScore] = React.useState(0);
  const [inARow, setInARow] = React.useState(0);
  const [highestInARow, setHighestInARow] = React.useState(0);
  const [scores, setScores] = React.useState<
    ReturnType<typeof createScoreRow>[]
  >(initScores || []);

  const resetRound = (): any => {
    setGuess("");
    const num = Math.random();
    if (num > 0.75 && wrong.length) {
      const result = wrong[0];
      setItem(result);
      return setIsCorrect(true);
    }

    const result = fn(data);
    if (result.answer === "") {
      return resetRound();
    }
    setItem(result);
    return setIsCorrect(true);
  };

  const resetGame = () => {
    resetRound();
    setScores(createScoresArray(currentScore, highestInARow, scores));
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

    if (item.answer === guess) {
      const idx = wrong.findIndex((v) => v.option === item.option);

      if (idx !== -1) {
        setWrong((prev) => {
          const newWrongs = [...prev];
          newWrongs.splice(idx, 1);
          return newWrongs;
        });
      }
      resetRound();
      setInARow((prev) => {
        if (prev + 1 > highestInARow) {
          setHighestInARow(prev + 1);
        }
        return prev + 1;
      });

      return setCurrentScore((prev) => prev + 2);
    }

    const idx = wrong.findIndex((v) => v.option === item.option);
    if (idx === -1) {
      setWrong((prev) => [...prev, item]);
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
    highestInARow,
    scores,
    guess,
    setGuess,
    item,
    next,
    isCorrect,
  };
};
