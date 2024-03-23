import { sendRequest, writeTextData } from "./lib.mjs";

const API_KEY = process.env.ELEVENSLAB_API_KEY;
const DUBBING_ID = "ghRGA48nJdcUBCduAhlj";

async function dubbingItemMeta(id) {
  const url = `https://api.elevenlabs.io/v1/dubbing/${id}`;

  const options = {
    headers: {
      "content-type": "application/json",
      "xi-api-key": API_KEY,
    },
    method: "GET",
  };

  const response = await sendRequest(url, options);
  await writeTextData(response, `output/dubbing-item-${id}.json`);
}

(async () => {
  try {
    await dubbingItemMeta(DUBBING_ID);
  } catch (error) {
    console.error("Runtime error:", error);
  }
})();
