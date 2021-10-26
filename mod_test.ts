import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { ModuleUrl } from "./types.ts";
// deno-lint-ignore camelcase
import * as deno_x from "./formats/deno_x.ts";
// deno-lint-ignore camelcase
import * as deno_std from "./formats/deno_std.ts";
import * as github from "./formats/github.ts";
import * as local from "./formats/local.ts";
import * as unknown from "./formats/unknown.ts";

type Spec = {
  format: keyof typeof formats;
  input: [string] | [string, string];
  result?: Omit<ModuleUrl, "format" | "toString">;
};

const formats = {
  // deno-lint-ignore camelcase
  deno_x,
  // deno-lint-ignore camelcase
  deno_std,
  github,
  local,
  unknown,
};

const keys: (keyof ModuleUrl)[] = [
  "format",
  "name",
  "path",
  "tag",
  "base",
];

// Load test specification from JSON file.
const specs: Spec[] = JSON.parse(
  await Deno.readTextFile("mod_test.json"),
);

specs.forEach((spec) => {
  const actual = () => {
    const format = formats[spec.format];
    return format.parse(spec.input[0], spec.input[1]);
  };
  if (!spec.result) {
    const title = `${spec.format} throws Error"`;
    Deno.test(title, () => {
      assertThrows(actual, Error);
    });
  } else {
    Deno.test(`${spec.format} toString returns input`, () => {
      assertEquals(String(actual()), spec.input[0]);
    });
    keys.forEach((key) => {
      const result = spec.result as ModuleUrl;
      const expected = key === "format" ? spec.format : result[key];
      const title = `${spec.format} returns ${key} "${expected}"`;
      Deno.test(title, () => {
        assertEquals(actual()[key], expected);
      });
    });
  }
});
