import { ModuleUrl } from "../types.ts";
import {
  basename,
  common,
  dirname,
  join,
  normalize,
  resolve,
} from "https://deno.land/std@0.103.0/path/mod.ts";

/**
 * Parses a module URL that points to a local file.
 *
 * The `rel` parameter is a path that points
 * from the directory that contains the module,
 * to the base of the project.
 *
 * Consider: `file:///home/user/example/deep/mod.ts`
 * In order to dedicate the `example` directory as the base,
 * the `rel` must be specified as `..`, moving one out of `deep`.
 */
export function parse(url: string, rel = "."): ModuleUrl {
  if (!url.startsWith("file://")) {
    throw new Error(
      `Not a valid URL of local module: <${url}>. Consider this example of a valid URL: <file:///home/user/example@1.2.3/mod.ts>. The version tag is optional.`,
    );
  }

  const baseUrl = new URL(url);
  const fullPath = normalize(baseUrl.pathname);
  const basePath = join(resolve(dirname(fullPath), rel), "/");

  // Ensure that the base URL contains the supplied URL.
  if (basePath !== common([basePath, fullPath])) {
    throw new Error(
      `Path "${fullPath}" is outside of base path "${basePath}", which was reached via the \`rel\` parameter "${rel}".`,
    );
  }

  baseUrl.pathname = basePath;
  const base = String(baseUrl);

  let tag = "";
  let name = basename(base);
  if (name.includes("@")) {
    [name, tag] = name.split("@");
  }

  const path = url.substr(base.length);

  return {
    format: "local",
    base,
    name,
    tag,
    path,
    toString: () => url,
  };
}
