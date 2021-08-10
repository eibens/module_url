export type ModuleUrl = {
  /** Identifier for the URL format. */
  format: string;
  /** Name of the repository. */
  name: string;
  /** Version tag name, or empty string if none is found. */
  tag: string;
  /** Base URL of the repository. */
  base: string;
  /** Path relative to the base URL of the repository. */
  path: string;
  /** Returns a string representation of the URL. */
  toString(): string;
};

/**
 * Defines a function that parses a module URL.
 *
 * @param url is the URL that should be parsed.
 * @param path is an optional parameter used for parsing local URLs.
 * @returns the parse result.
 * @throws if the URL is not valid.
 */
export type Parser = (url: string, path?: string) => ModuleUrl;
