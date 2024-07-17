import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import * as functions from "@/inngest/functions";

export const { POST } = serve({
  client: inngest,
  serveHost: "https://next-pxci-project.onrender.com",
  servePath:"/api/inngest",
  functions: [...Object.values(functions)],
});
