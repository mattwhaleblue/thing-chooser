"use client";
import React from "react";

import { Flash } from "../components/Flash";

import { data } from "../data";

const init = {
  option: "centrábamos",
  answer: "to focus",
  topText: "",
  bottomText: "",
};

const createItem = (input: typeof data) => {
  const result = input[Math.floor(Math.random() * data.length)];
  return {
    option: result.option,
    answer: result.answer,
    topText: "",
    bottomText: "",
  };
};

const Page = () => {
  return <Flash data={data} init={init} createItem={createItem} />;
};

export default Page;
