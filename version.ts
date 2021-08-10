import { parse } from "./mod.ts";

export const version = parse(import.meta.url);
