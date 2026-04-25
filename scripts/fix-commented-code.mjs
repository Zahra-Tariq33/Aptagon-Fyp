import fs from "fs";
import path from "path";

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "scripts") continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full);
    else if (full.endsWith(".tsx") || full.endsWith(".ts")) {
      let c = fs.readFileSync(full, "utf8");
      const orig = c;
      c = c.replace(/^\/\/\s*Cursor blink\s+/gm, "");
      c = c.replace(/^\/\/\s*Typing logic\s+/gm, "");
      c = c.replace(/^\/\/\s*--- Particle Interface ---\s+/gm, "");
      c = c.replace(/^\/\/\s*Parallax Effect[^\n]*\s+/gm, "");
      c = c.replace(/^\/\/\s*Background smooth movement\s+/gm, "");
      c = c.replace(/^\/\/\s*Compact Input Styles\s+/gm, "");
      c = c.replace(/^\/\/\s*Question\s+Area\s+/gm, "");
      c = c.replace(/^\/\/\s*Original request:[^\n]*\s*/gm, "");
      c = c.replace(/^\/\/\s*Slight scale for prominence\s+/gm, "");
      c = c.replace(/^\/\/\s*Elevate for prominence\s+/gm, "");
      c = c.replace(/^\/\/\s*original zoom\s*/gm, "");
      c = c.replace(/^\/\/\s*Focus on teal glow\s*/gm, "");
      c = c.replace(/^\/\/\s*MOVE FROM LEFT TO RIGHT ANIMATION\s+/gm, "");
      c = c.replace(/,\s*\/\/ Premium Cubic Bezier/g, ",");
      c = c.replace(/\)\s*\/\/ Original request:[^\n]*/g, ")");
      c = c.replace(/return \(\s*\/\/[^\n]*/g, "return (");
      c = c.replace(/className="([^"]*)"\s*\/\/[^\n]*/g, 'className="$1"');
      if (c !== orig) fs.writeFileSync(full, c);
    }
  }
}

walk(process.cwd());
console.log("fix-commented-code done");
