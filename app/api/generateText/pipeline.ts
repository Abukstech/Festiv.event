// pipelineSingleton.ts
import { pipeline } from "@huggingface/transformers";

let generatorInstance: any | null = null;

export async function getGenerator() {
  if (!generatorInstance) {
    generatorInstance = await pipeline(
      "text-generation",
      "onnx-community/Llama-3.2-3B-Instruct",
      { dtype: "fp32", device: "cpu" }
    );
  }
  return generatorInstance;
}
