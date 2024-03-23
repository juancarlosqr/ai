import { sendRequest, writeTextData } from "./lib.mjs";

const API_KEY = process.env.ELEVENSLAB_API_KEY;

async function models() {
  const url = `https://api.elevenlabs.io/v1/models`;

  const options = {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "xi-api-key": API_KEY,
    },
    method: "GET",
  };

  const response = await sendRequest(url, options);
  await writeTextData(response, "output/models.json");
}

(async () => {
  try {
    await models();
  } catch (error) {
    console.error("Runtime error:", error);
  }
})();
