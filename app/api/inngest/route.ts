import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import * as functions from "@/inngest/functions";

export const { POST } = serve({
  client: inngest,
  functions: [...Object.values(functions)],
});
