import { NextResponse } from "next/server";
import PipelineSingleton from "./pipeline";
import { pipeline } from "@huggingface/transformers";

// Define the type for the classification result if needed
type ClassificationResult = any; // Adjust this to the specific type returned by your pipeline if known

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
 
  const name = url.searchParams.get("name");
  const state = url.searchParams.get("state");
  const city = url.searchParams.get("city");
  const category  = url.searchParams.get("category");

  if (!name || !state || !city || !category) {
    return NextResponse.json(
      { error: "Missing one or more required parameters (name, state, city, category)" },
      { status: 400 }
    );
  }

  // Construct the prompt for text generation
  const text = `Generate a description for ${name}, an event happening in ${state}, ${city} falling under category of ${category}.`;


  const generator = await pipeline(
    "text-generation",
    "onnx-community/Qwen2.5-0.5B-Instruct",
    { dtype: "fp16", device: "cpu" }
  );

  const messages = [{ role: "user", content: text }];

  // Define the list of messages
  const output = await generator(messages, { max_new_tokens: 128 });

 

  // Return only the assistant's response
  return NextResponse.json({ generated_text: output });

// Return the output directly if it’s plain text









  
}
