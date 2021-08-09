await Deno.run({
  cmd: [
    "deno",
    "run",
    "-A",
    "https://deno.land/x/edcb@v0.6.1/cli.ts",
  ],
}).status();
