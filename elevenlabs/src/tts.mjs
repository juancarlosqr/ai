import { sendRequest, writeFileData } from "./lib.mjs";

const API_KEY = process.env.ELEVENSLAB_API_KEY;
const VOICE_ID = process.env.ELEVENSLAB_VOICE_ID;

async function textToSpeech(text, voiceId) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const body = {
    model_id: "eleven_multilingual_v2",
    text,
    pronunciation_dictionary_locators: [],
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.8,
      style: 0.0,
      use_speaker_boost: true,
    },
  };

  const options = {
    headers: {
      "content-type": "application/json",
      "xi-api-key": API_KEY,
    },
    method: "POST",
    body: JSON.stringify(body),
  };

  const response = await sendRequest(url, options, "audio");
  await writeFileData(response, "output/audio.mp3");
}

(async () => {
  try {
    const text =
      "The Matrix is everywhere. It is all around us. Even now in this very room";

    await textToSpeech(text, VOICE_ID);
  } catch (error) {
    console.error("Runtime error:", error);
  }
})();
