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
  urls.forEach((url, index) => {
    classifier.addDocument(url, types[index]);
  });
  classifier.train();
  fs.writeFileSync(modelPath, JSON.stringify(classifier));
}

export function loadModel(): boolean {
  if (fs.existsSync(modelPath)) {
    natural.BayesClassifier.load(
      modelPath,
      null,
      function (err, loadedClassifier) {
        if (err) {
          return false;
        }
        Object.assign(classifier, loadedClassifier);
      }
    );

    return true;
  }
  return false;
}

async function predictURL(url: string) {
  const domain = getDomain(url);
  const probabilities = classifier.getClassifications(domain);

  const bestMatch = probabilities[0];

  return bestMatch.label;
}

export async function predict(url: string) {
  try {
    await loadJSON(datasetPath);

    if (!loadModel()) {
      await trainModel();
    }

    const prediction = await predictURL(url);
    console.log(prediction);
    return prediction;
  } catch (error) {
    console.error("❌ Error:", error);
  }
}
