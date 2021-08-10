import { ModuleUrl } from "../types.ts";

export function parse(url: string): ModuleUrl {
  try {
    new URL(url);
  } catch (error) {
    throw new Error(
      `Not a valid URL: <${url}>. The native URL parser raised this error: \n${error}`,
    );
  }
  return {
    format: "unknown",
    base: "",
    name: "",
    path: "",
    tag: "",
    toString: () => url,
  };
}
