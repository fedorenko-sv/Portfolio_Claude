import fs from "node:fs";
for (const id of ["crm", "rehab", "lessons", "menu"]) {
  const file = new URL(
    "../public/showcase/" + id + "/index.html",
    import.meta.url,
  );
  if (!fs.existsSync(file))
    throw new Error(
      "Missing showcase " +
        id +
        ". Restore the owner-only presentation artifacts; see docs/design/implementation.md.",
    );
}
console.log("Four presentation packages present.");
