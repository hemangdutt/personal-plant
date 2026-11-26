
import * as tf from '@tensorflow/tfjs';

const MODEL_URL = '/model/model.json';

let modelPromise: Promise<tf.GraphModel> | null = null;

function loadModel() {
  if (!modelPromise) {
    modelPromise = tf.loadGraphModel(MODEL_URL);
  }
  return modelPromise;
}

export async function predictLeaf(file: File) {
  await tf.ready();

  const model = await loadModel();
  const image = await createImageBitmap(file);

  const prediction = tf.tidy(() => {
    const pixels = tf.browser.fromPixels(image)
      .resizeBilinear([224, 224])
      .toFloat()
      .div(127.5)
      .sub(1)
      .expandDims(0);

    return model.predict(pixels) as tf.Tensor;
  });

  const scores = Array.from(await prediction.data());
  console.log('MODEL RAW SCORES:', scores);
  prediction.dispose();
  image.close();

  return scores;
}
