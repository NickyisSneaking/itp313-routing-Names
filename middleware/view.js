import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const esc = (v) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const view = (name, data = {}) => {
  const file = path.join(dir, "..", "views", name + ".xian");
  let html = fs.readFileSync(file, "utf8");

  html = html.replace(/\{\{#each (\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (_, key, block) =>
    (data[key] || []).map((item) => block.replace(/\{\{(\w+)\}\}/g, (_m, f) => esc(item[f]))).join("")
  );
  html = html.replace(/\{\{(\w+)\.(\w+)\}\}/g, (_, obj, f) => esc(data[obj] ? data[obj][f] : ""));
  html = html.replace(/\{\{(\w+)\}\}/g, (_, k) => esc(data[k]));

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>CRUD</title></head>
<body style="font-family:sans-serif;max-width:800px;margin:20px auto">${html}</body></html>`;
};