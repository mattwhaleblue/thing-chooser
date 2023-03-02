import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(one: string, two: string) {
  return `
    I'm trying to choose between two thing: ${one} and ${two}, 
    which should I choose and why? Don't tell me it's up to me, or that you don't know, or it's my decision just give me your answer. 
    Also add a compliment about my appearance to the end and limit your response to 3 sentences.
  `;
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { one, two } = body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(one, two),
      temperature: 0.6,
      max_tokens: 200,
    });
    const image1 = await openai.createImage({
      prompt: `${one}`,
      n: 1,
      size: "256x256",
    });
    const image2 = await openai.createImage({
      prompt: `${two}`,
      n: 1,
      size: "256x256",
    });

    const url1 = image1.data.data[0].url;
    const url2 = image2.data.data[0].url;

    return NextResponse.json({
      result: completion.data.choices[0].text,
      url1,
      url2,
    });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    console.error("Error:", error);
  }
};
