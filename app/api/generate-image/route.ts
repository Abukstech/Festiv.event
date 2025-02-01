import { NextResponse } from "next/server";
import { openai } from "../generateText/pipeline";

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
  const text = `Create a visually stunning and eye-catching banner image for "${name}", an event happening in ${city}, ${state}. The event falls under the category of ${category}. Reflect the themes commonly associated with ${category} events. Incorporate vibrant colors and dynamic visuals that capture the essence of the event. Include elements such as symbols, icons, or imagery relevant to ${category}. Ensure the design evokes excitement and appeals to the target audience of ${category} enthusiasts. Add the event name "${name}" prominently in a stylish font, along with any additional text like dates, location, or taglines.`;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: text,
    n: 1,
    size: "1024x1024",
  });

  // const output = await generator([{ role: "user", content: text }], {
  //   max_new_tokens: 64,
  // });

  return NextResponse.json({ generated_image: response.data[0].url});
}
