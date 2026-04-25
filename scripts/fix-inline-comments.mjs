import fs from "fs";
import path from "path";

const root = path.join(process.cwd());

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "scripts") continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full);
    else if (full.endsWith(".tsx") || full.endsWith(".ts")) {
      let c = fs.readFileSync(full, "utf8");
      const orig = c;
      c = c.replace(/; \/\//g, ";\n// ");
      c = c.replace(/\} \/\//g, "}\n// ");
      c = c.replace(/\) \/\//g, ")\n// ");
      c = c.replace(/" \/> \/\//g, '"/>\n// ');
      c = c.replace(/\}\} \/\//g, "}}\n// ");
      if (c !== orig) fs.writeFileSync(full, c);
    }
  }
}

walk(root);
console.log("fixed inline // comments");
