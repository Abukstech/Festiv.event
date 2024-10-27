import { NextResponse } from "next/server";
import { getGenerator } from "./pipeline";

// Define the type for the classification result if needed
type ClassificationResult = any; // Adjust this to the specific type returned by your pipeline if known

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);

  const name = url.searchParams.get("name");
  const state = url.searchParams.get("state");
  const city = url.searchParams.get("city");
  const category = url.searchParams.get("category");

  if (!name || !state || !city || !category) {
    return NextResponse.json(
      {
        error:
          "Missing one or more required parameters (name, state, city, category)",
      },
      { status: 400 }
    );
  }

  // Construct the prompt for text generation
  const text = `Generate a description for ${name}, an event happening in ${state}, ${city} falling under category of ${category}.`;

  const generator = await getGenerator();
  const output = await generator([{ role: "user", content: text }], {
    max_new_tokens: 64,
  });

  return NextResponse.json({ generated_text: output });
}
