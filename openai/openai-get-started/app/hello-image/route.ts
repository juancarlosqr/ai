import OpenAI from "openai";

const openai = new OpenAI();

export async function GET() {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "a white horse running on a city street",
    n: 1,
    size: "1024x1024",
    quality: "hd",
    style: "vivid",
  });

  console.log(response.data);

  return Response.json(response.data);
}
