// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、家と、その中の小さな炎。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <polygon points="50,14 88,46 12,46" fill="#f6d77a"/>
      <rect x="22" y="46" width="56" height="40" rx="2" fill="#fffdf7"/>
      <path d="M50 52 C58 62 62 68 58 76 C55 82 45 82 42 76 C38 68 44 64 48 58 C48 64 52 66 50 52 Z" fill="#b23a24"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
