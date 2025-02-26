import * as tf from "@tensorflow/tfjs-node";
import { loadData } from "./preprocess";
import path from "path";

async function trainModel() {
  const maxLen = 100;
  const { data, labels } = await loadData(
    path.join(__dirname, "data-2.csv"),
    maxLen
  );

  const xs = tf.tensor2d(data);
  const ys = tf.oneHot(tf.tensor1d(labels, "int32"), 2);

  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 64, activation: "relu", inputShape: [maxLen] })
  );
  model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  model.add(tf.layers.dense({ units: 2, activation: "softmax" }));

  model.compile({
    optimizer: "adam",
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  await model.fit(xs, ys, {
    epochs: 10,
    batchSize: 32,
    validationSplit: 0.2,
  });

  await model.save(
    "file:///C:/Users/Ashis/Desktop/FE-Assessment/user-basic-auth/backend/app/ai"
  );
  console.log("Model trained and saved.");
}

trainModel();
