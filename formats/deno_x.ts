import { ModuleUrl } from "../types.ts";

const pattern = /^(https:\/\/deno.land\/x\/([^/@]+)(?:@([^/]+))?\/)(.*)$/;

export function parse(url: string): ModuleUrl {
  const match = url.match(pattern);
  if (!match) {
    throw new Error(
      `Not a valid URL of third-party module hosted on Denoland: <${url}>. Consider this example of a valid URL: <https://deno.land/x/example@1.2.3/mod.ts>. The version tag is optional.`,
    );
  }
  return {
    format: "deno_x",
    base: match[1],
    name: match[2],
    tag: match[3],
    path: match[4],
  };
}
