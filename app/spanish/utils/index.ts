import { v4 as uuid } from "uuid";

import { verbs, otherVerbs } from "../data";

const data = [...verbs, ...otherVerbs];

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
