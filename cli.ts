import { version } from "./version.ts";

// This CLI prints the module URL of this repository.
for (const key in version) {
  const value = key === "toString"
    ? String(version)
    : version[key as keyof typeof version];
  console.log(`${key}: ${value || "<empty>"}`);
}
