const fs = require("fs");

const file = "src/app/page.tsx";
let s = fs.readFileSync(file, "utf8");

const fixed = `const fallbackSettings: SiteSettings = {
  site_title: "PROJECT 10",
  subtitle: "NCKU Baseball Club 10th Anniversary Game",
  slogan: "一旦怠惰，很快就會出現差距。不滿足於現狀，要越變越強！",
  project_intro: "作為紀念成大乙棒走過的第一個 10 年。",
  event_intro: "2026 年 5 月 30 日於中信科大舉辦十週年 OB 賽。",
  event_date: "2026.05.30",
  event_place: "中信科大棒球場",
  hero_image_url: "/images/main-visual.png",
  logo_url: "/images/logo.png",
};`;

s = s.replace(
  /const fallbackSettings: SiteSettings = \{[\s\S]*?\};/,
  fixed
);

fs.writeFileSync(file, s, "utf8");
console.log("fixed src/app/page.tsx fallbackSettings");