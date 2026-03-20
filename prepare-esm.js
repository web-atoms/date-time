const { readFileSync, writeFileSync } = require("fs");
const p = JSON.parse(readFileSync("./package.json", "utf-8"));
p.type = "module";
writeFileSync("./package.json", JSON.stringify(p), "utf-8");
