import FormData from "form-data";
import { readFile, sendRequest, writeTextData } from "./lib.mjs";

const API_KEY = process.env.ELEVENSLAB_API_KEY;

async function dubbing() {
  const url = `https://api.elevenlabs.io/v1/dubbing`;
  const fileName = "output/video.mp4";

  const form = new FormData();

  form.append("mode", "automatic");
  form.append("source_lang", "en");
  form.append("target_lang", "es");
  form.append("watermark", "true");
  form.append("file", readFile(fileName), "video.mp4");

  const options = {
    headers: {
      "xi-api-key": API_KEY,
    },
    method: "POST",
    body: form,
  };

  const response = await sendRequest(url, options);
  await writeTextData(response, "output/dubbing.json");
}

(async () => {
  try {
    await dubbing();
  } catch (error) {
    console.error("Runtime error", error);
    process.exit(1);
  }
})();
