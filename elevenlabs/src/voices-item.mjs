import { sendRequest, writeTextData } from "./lib.mjs";

const API_KEY = process.env.ELEVENSLAB_API_KEY;
const VOICE_ID = process.env.ELEVENSLAB_VOICE_ID;

async function voicesItem(voicesItemId) {
  const url = `https://api.elevenlabs.io/v1/voices/${voicesItemId}`;

  const options = {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "xi-api-key": API_KEY,
    },
    method: "GET",
  };

  const response = await sendRequest(url, options);
  await writeTextData(response, `output/voices-item-${voicesItemId}.json`);
}

(async () => {
  try {
    await voicesItem(VOICE_ID);
  } catch (error) {
    console.error("Runtime error:", error);
  }
})();
