import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import * as functions from "@/inngest/functions";

export const { POST, GET } = serve({
  client: inngest,
 
  servePath: "/api/inngest",
  functions: [...Object.values(functions)],
});
