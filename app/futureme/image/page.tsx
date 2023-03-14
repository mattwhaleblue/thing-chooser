import React from "react";
import Image from "next/image";
import { image } from "./image";
import { Header } from "../components/Header";

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const bufferToBase64 = (buffer: ArrayBuffer) => {
  const arr = new Uint8Array(buffer);
  const base64 = Buffer.from(arr).toString("base64");
  console.log(`data:image/png;base64,${base64}`);
  return `data:image/png;base64,${base64}`;
};

type T = {
  data: string | null;
  loading: boolean;
  error: boolean;
};

async function getData(): Promise<T> {
  // const response = await fetch(
  //   `https://api-inference.huggingface.co/models/mattmatthunging/mattmattcat`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.HF_AUTH_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({
  //       inputs:
  //         "mattmattcat intricate character portrait, robert de niro, intricate, beautiful, 8k resolution, dynamic lighting, hyperdetailed, quality 3D rendered, volumetric lighting, greg rutkowski, detailed background, artstation character portrait, dnd character portrait",
  //     }),
  //   }
  // );

  // if (response.ok) {
  //   const buffer = await response.arrayBuffer();
  //   return { data: bufferToBase64(buffer), loading: false, error: false };
  // } else if (response.status === 503) {
  //   const json = await response.json();
  //   await sleep(json.estimated_time * 1000);
  //   return getData();
  // } else {
  //   const json = await response.json();
  //   console.error("error", json);
  //   throw new Error(json.error);
  // }

  return { data: image, loading: false, error: false };
}

const Page = async () => {
  const result = await getData();
  if (result.loading || !result.data) return <div>loading...</div>;

  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div className="w-full flex flex-col items-center gap-6 justify-center">
        <p>This what you gun look like</p>
        <div className="overflow-hidden rounded-xl">
          <Image src={result.data} height={320} width={320} alt="image of me" />
        </div>
      </div>
    </div>
  );
};

// #7928CA
// #FF0080

export default Page;
