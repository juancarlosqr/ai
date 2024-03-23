import { sendRequest, writeFileData } from "./lib.mjs";

const API_KEY = process.env.ELEVENSLAB_API_KEY;
const HISTORY_ITEM_ID = "Gt8fvc11AHOKY3k0CLpR";

async function history(historyItemId) {
  const url = `https://api.elevenlabs.io/v1/history/${historyItemId}/audio`;

  const options = {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "xi-api-key": API_KEY,
    },
    method: "GET",
  };

  const response = await sendRequest(url, options, "audio");
  await writeFileData(
    response,
    `output/history-item-audio-${historyItemId}.mp3`
  );
}

(async () => {
  try {
    await history(HISTORY_ITEM_ID);
  } catch (error) {
    console.error("Runtime error:", error);
  }
})();
