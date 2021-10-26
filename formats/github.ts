import { ModuleUrl } from "../types.ts";

const pattern =
  /^(https:\/\/raw.githubusercontent.com\/[^/]+\/)([^/]+)\/([^/]+)\/(.*)$/;

export function parse(url: string): ModuleUrl {
  const match = url.match(pattern);
  if (!match) {
    throw new Error(
      `Not a valid URL of a file hosted on GitHub: <${url}>. Consider this example of a valid URL: <https://raw.githubusercontent.com/user/example/1.2.3/mod.ts>. A version or branch tag is required.`,
    );
  }
  return {
    format: "github",
    base: match[1],
    name: match[2],
    tag: match[3],
    path: match[4],
    toString: () => url,
  };
}
