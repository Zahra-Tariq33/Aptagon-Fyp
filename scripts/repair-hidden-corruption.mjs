import fs from "fs";
import path from "path";

const root = process.cwd();
const exts = new Set([".tsx", ".ts", ".jsx", ".js", ".css"]);

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full);
    else if (exts.has(path.extname(full))) {
      let c = fs.readFileSync(full, "utf8");
      const orig = c;
      c = c.replace(/\{\s*:\s*\{/g, "{ hidden: {");
      c = c.replace(/initial=""/g, 'initial="hidden"');
      c = c.replace(/overflow-\s/g, "overflow-hidden ");
      c = c.replace(/overflow-"([^\s])/g, 'overflow-hidden"$1');
      c = c.replace(/overflow-"/g, 'overflow-hidden"');
      c = c.replace(/overflow-'/g, "overflow-hidden'");
      c = c.replace(/overflow-\)/g, "overflow-hidden)");
      c = c.replace(/overflow-\}/g, "overflow-hidden}");
      if (c !== orig) fs.writeFileSync(full, c);
    }
  }
}

walk(root);
console.log("repair done");
