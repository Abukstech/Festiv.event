import { NextResponse } from "next/server";
import { openai } from "./pipeline";



// Define the type for the classification result if needed


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
  const text = `Craft an engaging description for "${name}", an exciting event taking place in ${city}, ${state}. This event falls under the category of ${category} and promises to offer a unique experience for attendees. Highlight the key aspects of the event, such as its theme, target audience, and any special features or activities that make it stand out.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        
        {
            role: "user",
            content: text,
        },
    ],
  
});




  // const output = await generator([{ role: "user", content: text }], {
  //   max_new_tokens: 64,
  // });

  return NextResponse.json({ generated_text: completion.choices[0].message});
}
