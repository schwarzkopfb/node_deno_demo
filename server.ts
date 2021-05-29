import { serve } from "https://deno.land/std@0.97.0/http/server.ts";

const port = 3333;
const server = serve({ port });
const { readTextFile } = Deno;

console.log("server is ready to accept connections on port", port);

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

  request.respond({ status, body });
}
