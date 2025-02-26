import natural from "natural";
import fs from "fs";
import { parse } from "url";
import path from "path";

const classifier = new natural.BayesClassifier();

const modelPath = path.join(__dirname, "model.json");
const datasetPath = path.join(__dirname, "demo.json");

const urls: string[] = [];
const types: string[] = [];

function getDomain(url: string): string {
  const parsed = parse(url);

  return parsed.hostname || url;
}

function loadJSON(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error(`File not found: ${filePath}`));
      return;
    }
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        jsonData.forEach((entry: { url: string; type: string }) => {
          urls.push(getDomain(entry.url));
          types.push(entry.type);
        });
        resolve();
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

async function trainModel() {
  if (urls.length === 0) {
    throw new Error(
      "No data available for training. Ensure `demo.json` contains valid data."
    );
  }

  urls.forEach((url, index) => {
    classifier.addDocument(url, types[index]);
  });

  classifier.train();
  fs.writeFileSync(modelPath, JSON.stringify(classifier));
  console.log("✅ Model trained and saved.");
}

export function loadModel(): boolean {
  if (fs.existsSync(modelPath)) {
    natural.BayesClassifier.load(modelPath, null, (err, loadedClassifier) => {
      if (err) {
        console.error("❌ Error loading model:", err);
        return false;
      }
      Object.assign(classifier, loadedClassifier);
    });

    console.log("✅ Model loaded successfully.");
    return true;
  }
  return false;
}

async function predictURL(url: string) {
  const domain = getDomain(url);
  console.log(domain);
  const probabilities = classifier.getClassifications(domain);

  if (probabilities.length === 0) {
    throw new Error("No predictions available. Model might be untrained.");
  }

  const bestMatch = probabilities[0];
  return bestMatch.label;
}

export async function predict(url: string) {
  try {
    // Load model if available
    if (!loadModel()) {
      if (!fs.existsSync(datasetPath)) {
        throw new Error(`Dataset file not found: ${datasetPath}`);
      }

      console.log("⚠️ Model not found. Training a new one...");
      await loadJSON(datasetPath);
      await trainModel();
    }

    const prediction = await predictURL(url);
    console.log("Prediction:", prediction);
    return prediction;
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }
}
