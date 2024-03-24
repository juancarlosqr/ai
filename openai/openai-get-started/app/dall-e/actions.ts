"use server";

import OpenAI from "openai";

const openai = new OpenAI();

export async function createImage(prevState: any, formData: FormData) {
  try {
    const prompt = formData.get("prompt")?.toString();

    if (!prompt) {
      throw new Error("No prompt!");
    }

    console.log(`🎨 Generating image for prompt: "${prompt}"`);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      style: "natural",
    });

    console.log("🎨 Done generating!");
    console.log({
      original_prompt: prompt,
      ...response.data[0],
    });

    return { error: false, prompt, url: response.data[0].url };
  } catch (error) {
    console.log(error);

    return { error: true };
  }
}
