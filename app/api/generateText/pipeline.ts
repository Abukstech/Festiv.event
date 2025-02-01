import OpenAI from "openai";

export const openai = new OpenAI({
    organization: process.env.OPENAI_ORG_KEY,
    project:process.env.OPENAI_PROJECT_KEY,
});
