import * as tf from "@tensorflow/tfjs";
import { preprocessURL, padSequence } from "./preprocess";

async function loadModel() {
  return await tf.loadLayersModel("file://./model/model.json");
}

async function isURLSafe(url: string): Promise<boolean> {
  const model = await loadModel();
  const maxLen = 100;

  // Preprocess the URL
  const processedURL = preprocessURL(url);
  const paddedURL = padSequence(processedURL, maxLen);
  const inputTensor = tf.tensor2d([paddedURL]);

  // Predict
  const prediction = model.predict(inputTensor) as tf.Tensor;
  const result = prediction.argMax(1).dataSync()[0]; // 0 = safe, 1 = malicious
  return result === 0;
}

// // Example usage
(async () => {
  const url = "http://example.com";
  const isSafe = await isURLSafe(url);
  console.log(`URL is ${isSafe ? "safe" : "malicious"}`);
})();

export { isURLSafe };
