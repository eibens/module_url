import * as DenoX from "./formats/deno_x.ts";
import * as DenoStd from "./formats/deno_std.ts";
import * as GitHub from "./formats/github.ts";
import * as Local from "./formats/local.ts";
import * as Unknown from "./formats/unknown.ts";
import { ModuleUrl, Parser } from "./types.ts";

export * from "./types.ts";

const parsers: Parser[] = [
  DenoX.parse,
  DenoStd.parse,
  GitHub.parse,
  Local.parse,
];

export function parse(url: string, path?: string): ModuleUrl {
  for (const parser of parsers) {
    try {
      return parser(url, path);
    } catch (_) {
      // try next
    }
  }
  return Unknown.parse(url);
}
