import OpenAI from "openai";

const openai = new OpenAI();

export async function GET() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices);

  return Response.json({ message: completion.choices[0] });
}
