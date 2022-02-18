# module_url

[module_url] is a library for extracting information from a TypeScript or ESM
module URL. It provides parsers for various [formats](#formats). It is
implemented in TypeScript for Deno.

[![License][license-shield]](LICENSE)
[![Deno module][deno-land-shield]][deno-land]
[![Github
tag][github-shield]][github] [![Build][build-shield]][build]
[![Code
coverage][coverage-shield]][coverage]

# Usage

Import a parser that supports all formats:

```ts
import { parse } from "https://deno.land/x/module_url/mod.ts";
```

Import a parser for a single format:

```ts
import { parse } from "https://deno.land/x/module_url/formats/deno_x.ts";
```

Use the parser to parse a URL:

```ts
import { parse } from "https://deno.land/x/module_url/mod.ts";

// Parse a URL.
const url = "https://deno.land/x/module_url@v1.2.3/mod.ts";
const { format, name, path, base, tag } = parse(url);

// Test the results.
console.assert(format === "deno_x");
console.assert(name === "module_url");
console.assert(path === "mod.ts");
console.assert(tag === "v1.2.3");
console.assert(base === "https://deno.land/x/module_url@v1.2.3/");
```

If the format is not supported by the parser, it throws an `Error`:

```ts
import { parse } from "https://deno.land/x/module_url/formats/deno_x.ts";

// This URL format is not supported by deno_x parser.
const url = "file:///home/user/example/mod.ts";
try {
  parse(url);
  // The line above should have thrown an error.
  console.assert(false);
} catch (error) {
  // Success!
}
```

# Formats

These are the formats currently supported by [module_url]. This list might grow
in the future.

## Misc

- [`unknown`](formats/unknown.ts): catch-all for unknown formats
  <br>pattern: (matches any valid URL)

- [`local`](formats/local.ts): local file system
  <br>pattern: `file:///**/<name>[@<tag>]/<path>`

## Deno

- [`deno_x`](formats/deno_x.ts): [Deno third party] modules
  <br>pattern: `https://deno.land/x/<name>[@<tag>]/<path>`

- [`deno_std`](formats/deno_std.ts): [Deno standard] library modules
  <br>pattern: `https://deno.land/std[@<tag>]/<name>/<path>`

## GitHub

- [`github`](formats/github.ts): raw files on [GitHub](https://github.com)
  <br>pattern: `https://raw.githubusercontent.com/*/<name>/<tag>/<path>`

<!-- references -->

[module_url]: #
[deno third party]: https://deno.land/x/
[deno standard]: https://deno.land/std/

<!-- badges -->

[github]: https://github.com/eibens/module_url
[github-shield]: https://img.shields.io/github/v/tag/eibens/module_url?label&logo=github
[coverage-shield]: https://img.shields.io/codecov/c/github/eibens/module_url?logo=codecov&label
[license-shield]: https://img.shields.io/github/license/eibens/module_url?color=informational
[coverage]: https://codecov.io/gh/eibens/module_url
[build]: https://github.com/eibens/module_url/actions/workflows/ci.yml
[build-shield]: https://img.shields.io/github/workflow/status/eibens/module_url/ci?logo=github&label
[deno-land]: https://deno.land/x/module_url
[deno-land-shield]: https://img.shields.io/badge/x/module__url-informational?logo=deno&label
