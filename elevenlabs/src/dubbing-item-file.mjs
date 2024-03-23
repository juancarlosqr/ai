import { sendRequest, writeFileData } from "./lib.mjs";

const API_KEY = process.env.ELEVENSLAB_API_KEY;
const DUBBING_ID = "ghRGA48nJdcUBCduAhlj";
const DUBBING_TARGET_LANGUAGE = "es";

async function dubbingItemFile(id, lang) {
  const url = `https://api.elevenlabs.io/v1/dubbing/${id}/audio/${lang}`;

  const options = {
    headers: {
      "content-type": "application/json",
      "xi-api-key": API_KEY,
    },
    method: "GET",
  };

  const response = await sendRequest(url, options, "video");
  await writeFileData(response, `output/dubbing-item-${id}.mp4`);
}

(async () => {
  try {
    await dubbingItemFile(DUBBING_ID, DUBBING_TARGET_LANGUAGE);
  } catch (error) {
    console.error("Runtime error:", error);
  }
})();
