"use client";
import React from "react";

const Page = () => {
  const [result, setResult] = React.useState({
    loading: false,
    data: { text: "", url1: "", url2: "" },
    error: false,
  });

  const [things, setThings] = React.useState({
    one: "",
    two: "",
  });

  const { one, two } = things;

  const onClick = async () => {
    setResult({
      loading: true,
      data: { text: "", url1: "", url2: "" },
      error: false,
    });
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        one,
        two,
      }),
    });

    const data = await response.json();

    setResult({
      loading: false,
      data: { text: data.result, url1: data.url1, url2: data.url2 },
      error: false,
    });

    if (data.error) {
      setResult({
        loading: false,
        data: { text: "", url1: "", url2: "" },
        error: true,
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4 justify-center p-4 w-full md:px-64 md:py-4">
      <h1 className="text-6xl font-bold">THING CHOOSER</h1>

      <label htmlFor="two" className="flex flex-col">
        <small>THING ONE</small>
        <input
          type="text"
          placeholder="Enter a thing..."
          value={one}
          className="mt-2 h-12 w-full md:w-96 rounded-lg border-2 border-white bg-transparent overflow-hidden px-4"
          onChange={(e) => setThings({ ...things, one: e.target.value })}
        />
      </label>
      <label htmlFor="two" className="flex flex-col">
        <small>THING TWO</small>
        <input
          type="text"
          placeholder="Enter a thing another..."
          value={two}
          className="mt-2 h-12 w-full md:w-96 rounded-lg border-2 border-white bg-transparent overflow-hidden px-4"
          onChange={(e) => setThings({ ...things, two: e.target.value })}
        />
      </label>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-96">
        <button
          className="bg-white text-slate-800 rounded-lg py-3 px-6 w-full"
          onClick={onClick}
        >
          {result.loading ? "LOADING..." : "CHOOSE FOR ME"}
        </button>
        <button
          className="border-2 border-white rounded-lg py-3 px-6 text-white w-full"
          onClick={() => {
            setThings({ one: "", two: "" });
            setResult({
              loading: false,
              data: { text: "", url1: "", url2: "" },
              error: false,
            });
          }}
        >
          RESET
        </button>
      </div>

      <hr />

      {result.loading === false && result.data.text && (
        <div className="p-4 border-2 border-white rounded-lg">
          {result.data.text
            .split(`.`)
            .map(
              (sentence, i) => !!sentence.length && <p key={i}>{sentence}.</p>
            )}
        </div>
      )}

      {result.loading === false && result.data.url1 && result.data.url2 && (
        <div className="text-white flex flex-col md:flex-row gap-4 p-4 border-2 border-white rounded-lg ">
          <p>Here are some pictures to help you decide:</p>
          <img src={result.data.url1} alt="" className="w-96" />
          <img src={result.data.url2} alt="" className="w-96" />
        </div>
      )}
    </div>
  );
};

export default Page;
