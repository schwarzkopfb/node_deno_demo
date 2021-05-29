// $ deno run --allow-net=:3333 --allow-read=index.html server2.ts

import { serve } from "https://deno.land/std@0.97.0/http/server.ts";

const port = 3333;
const { readTextFile } = Deno;

export default async function processRequests(isTestMode = false) {
  const server = serve({ port });

  if (!isTestMode) {
    console.log("server is ready to accept connections on port", port);
  }

  for await (const request of server) {
    let status: number;
    let body: string;

    try {
      status = 200;
      body = await readTextFile("index.html");
    } catch {
      status = 500;
      body = "unable to read file";
    }

    await request.respond({ status, body });

    if (isTestMode) {
      server.close();
    }
  }
}

if (import.meta.main) {
  processRequests();
}
