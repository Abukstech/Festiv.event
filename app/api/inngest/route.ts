import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import * as functions from "@/inngest/functions";

export const { POST, GET, PUT } = serve({
  client: inngest,
  servePath: "/api/inngest",
  signingKey: process.env.INNGEST_SIGNING_KEY,
  functions: [...Object.values(functions)],
});
