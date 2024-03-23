import { writeFile, createReadStream } from "fs";
import fetch from "node-fetch";

export async function sendRequest(url, options, type = "json") {
  console.log(`Request URL: ${url}`);
  console.log(`Request options:`, options);

  try {
    const response = await fetch(url, options);

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    // Check for successful response
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    // Ensure response type is audio
    if (response.headers.get("Content-Type").indexOf(type) === -1) {
      console.log(`Expected response to be of type ${type}`);
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function writeTextData(response, filePath) {
  // Save response's json
  const json = await response.json();

  // Write text data to the file system
  writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.error("Error saving file:", err);
    } else {
      console.log(`File saved successfully: ${filePath}`);
    }
  });
}

export async function writeFileData(response, filePath) {
  // Save response's blob
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write blob data to the file system
  writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("Error saving file:", err);
    } else {
      console.log(`File saved successfully: ${filePath}`);
    }
  });
}

export function readFile(filePath) {
  return createReadStream(filePath);
}
