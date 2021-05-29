// $ deno test --allow-net=:3333 --allow-read=index.html

import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import processRequests from "./server2.ts";

Deno.test({
  name: "Fetch html content",
  async fn() {
    processRequests(true);
    const response = await fetch("http://localhost:3333");
    assert(response.ok);
    assertEquals(await response.text(), "<h1>Hello World!</h1>");
  },
});
