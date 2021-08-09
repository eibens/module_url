# Contributing to [module_url](../README.md)

Before committing, run this to format, lint, and run tests on the code:

```sh
deno run -A dev.ts
```

# Adding new formats

New parsers go into the [formats](formats) directory. The format name must
correspond to the file name. For example, the format `deno_x` is defined in the
file [formats/deno_x.ts](formats/deno_x.ts).
