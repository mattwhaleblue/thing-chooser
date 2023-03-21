"use client";
import React from "react";

import { Flash } from "../components/Flash";
import { otherVerbs, verbs } from "../data";
const data = [...verbs, ...otherVerbs];

const init = {
  option: "dar",
  answer: "dieron",
  topText: "preterite",
  bottomText: "ellos",
};

const createItem = (input: typeof data) => {
  const result = input[Math.floor(Math.random() * data.length)];
  const tenses = ["present", "preterite", "imperfect"] as const;
  const tense = tenses[Math.floor(Math.random() * tenses.length)];
  const conjugations = ["yo", "tu", "el", "nosotros", "ellos"] as const;
  const conjugation =
    conjugations[Math.floor(Math.random() * conjugations.length)];
  return {
    option: result.name,
    answer: result[tense][conjugation],
    topText: tense,
    bottomText: conjugation,
  };
};

const Page = () => {
  return <Flash data={data} init={init} createItem={createItem} />;
};

export default Page;
