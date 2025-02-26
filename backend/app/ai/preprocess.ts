import fs from "fs";
import csv from "csv-parser";

interface CSVRow {
  url: string;
  type: string;
}

// Preprocess a single URL
function preprocessURL(url: string): number[] {
  // Remove 'http://', 'https://', 'www', etc.
  const cleanedURL = url.replace(/(https?:\/\/|www\.)/g, "");
  // Convert characters to ASCII codes
  return cleanedURL.split("").map((char) => char.charCodeAt(0));
}

// Pad sequences to a fixed length
function padSequence(sequence: number[], maxLen: number): number[] {
  if (sequence.length > maxLen) {
    return sequence.slice(0, maxLen);
  } else {
    return sequence.concat(new Array(maxLen - sequence.length).fill(0));
  }
}

// Load and preprocess CSV data
async function loadData(
  filePath: string,
  maxLen: number
): Promise<{ data: number[][]; labels: number[] }> {
  const data: number[][] = [];
  const labels: number[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: CSVRow) => {
        const processedURL = preprocessURL(row.url);
        const paddedURL = padSequence(processedURL, maxLen);
        data.push(paddedURL);

        // Convert label to binary: 0 for benign, 1 for malicious
        labels.push(row.type === "benign" ? 0 : 1);
      })
      .on("end", () => {
        resolve({ data, labels });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

export { loadData, padSequence, preprocessURL };
