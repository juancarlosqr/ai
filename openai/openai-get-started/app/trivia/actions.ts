"use server";

import OpenAI from "openai";

const openai = new OpenAI();

const shape = {
  options: [
    {
      text: "1956",
      correct: false,
    },
    {
      text: "1987",
      correct: false,
    },
    {
      text: "2014",
      correct: true,
    },
    {
      text: "2017",
      correct: false,
    },
  ],
};

/**
 * Prompt examples
 *
 * In which year, the Lakers won the championship for the last time?
 * How many states Venezuela has?
 * What is the home city of Yankees?
 */
export async function generate(prevState: any, formData: FormData) {
  const prompt = formData.get("prompt")?.toString();
  try {
    if (!prompt) {
      throw new Error("No prompt!");
    }

    console.log(` Generating text for prompt: "${prompt}"`);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
      You are a trivia answers generator.
      You should always provide your response in JSON format, with an array of four options to answer a trivia.
      One option, and only option should be marked as correct, and it should be the correct answer.
      Randomize the position of the correct answer in the answers array, so is not always in the same position.
      No option should be repeated, and they should not create ambiguity for the user.
      `,
        },
        {
          role: "user",
          content:
            "In which year, the San Francisco Giants won the world series for the last time?",
        },
        { role: "assistant", content: JSON.stringify(shape) },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(JSON.stringify(completion, null, 4));

    return {
      content: JSON.parse(completion.choices[0].message.content || ""),
      error: false,
      prompt,
    };
  } catch (error) {
    console.log(error);

    return { error: true, content: null, prompt };
  }
}
