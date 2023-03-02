import { v4 as uuid } from "uuid";

import { data } from "../data";

export const createVerb = () => {
  const result = data[Math.floor(Math.random() * data.length)];
  const tenses = ["present", "preterite", "imperfect"] as const;
  const tense = tenses[Math.floor(Math.random() * tenses.length)];
  const conjugations = ["yo", "tu", "el", "nosotros", "ellos"] as const;
  const conjugation =
    conjugations[Math.floor(Math.random() * conjugations.length)];
  return {
    name: result.name,
    verb: result[tense][conjugation],
    tense,
    conjugation,
  };
};

export const init: ReturnType<typeof createVerb> = {
  name: "dar",
  verb: "dieron",
  tense: "preterite",
  conjugation: "ellos",
};

export const createScoreRow = (score: number) => {
  return {
    id: uuid(),
    score,
    date: new Date().toDateString(),
  };
};

export const createScoresArray = (
  score: number,
  prev: ReturnType<typeof createScoreRow>[]
) => {
  const newArr = [...prev, createScoreRow(score)];

  const sortedArr = newArr.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(sortedArr));
  return sortedArr;
};
