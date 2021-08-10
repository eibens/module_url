import { ModuleUrl } from "../types.ts";

const pattern = /^(https:\/\/deno.land\/std(?:@([^/]+))?\/([^/]+)\/)(.*)$/;

export function parse(url: string): ModuleUrl {
  const match = url.match(pattern);
  if (!match) {
    throw new Error(
      `Not a valid URL of standard-library module hosted on Denoland: <${url}>. Consider this example of a valid URL: <https://deno.land/std@1.2.3/example/mod.ts>. The version tag is optional.`,
    );
  }
  return {
    format: "deno_std",
    base: match[1],
    tag: match[2],
    name: match[3],
    path: match[4],
    toString: () => url,
  };
}
