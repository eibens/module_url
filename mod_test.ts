import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { ModuleUrl, Parser } from "./types.ts";
import * as DenoX from "./formats/deno_x.ts";
import * as DenoStd from "./formats/deno_std.ts";
import * as Local from "./formats/local.ts";
import * as Unknown from "./formats/unknown.ts";

type Spec = {
  parser: Parser;
  input: [string] | [string, string];
  format: string;
  result?: Omit<ModuleUrl, "format" | "toString">;
};

const keys: (keyof ModuleUrl)[] = [
  "format",
  "name",
  "path",
  "tag",
  "base",
];

const specs: Spec[] = [
  {
    format: "unknown",
    parser: Unknown.parse,
    input: ["funky://mod.ts"],
    result: {
      base: "",
      name: "",
      path: "",
      tag: "",
    },
  },
  {
    format: "local",
    parser: Local.parse,
    input: ["file:///example@1.2.3/mod.ts"],
    result: {
      base: "file:///example@1.2.3/",
      tag: "1.2.3",
      name: "example",
      path: "mod.ts",
    },
  },
  {
    format: "local",
    parser: Local.parse,
    input: ["file:///example/deep/mod.ts", ".."],
    result: {
      base: "file:///example/",
      tag: "",
      name: "example",
      path: "deep/mod.ts",
    },
  },
  {
    format: "deno_x",
    parser: DenoX.parse,
    input: ["https://deno.land/x/example@1.2.3/mod.ts"],
    result: {
      base: "https://deno.land/x/example@1.2.3/",
      tag: "1.2.3",
      path: "mod.ts",
      name: "example",
    },
  },
  {
    format: "deno_std",
    parser: DenoStd.parse,
    input: ["https://deno.land/std@1.2.3/example/mod.ts"],
    result: {
      base: "https://deno.land/std@1.2.3/example/",
      tag: "1.2.3",
      path: "mod.ts",
      name: "example",
    },
  },
  // TEST ERRORS
  {
    format: "unknown",
    parser: Unknown.parse,
    input: ["not a URL"],
  },
  {
    format: "local",
    parser: Local.parse,
    input: ["https://deno.land/x/example/mod.ts"],
  },
  {
    format: "local",
    parser: Local.parse,
    input: ["file://example/deep/mod.ts", "../secret"],
  },
  {
    format: "deno_x",
    parser: DenoX.parse,
    input: ["https://deno.land/std/example/mod.ts"],
  },
  {
    format: "deno_std",
    parser: DenoStd.parse,
    input: ["https://deno.land/x/example/mod.ts"],
  },
];

specs.forEach((spec) => {
  const actual = () => {
    return spec.parser(spec.input[0], spec.input[1]);
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
