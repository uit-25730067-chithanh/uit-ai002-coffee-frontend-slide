import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runTests() {
  const readmePath = path.resolve(__dirname, "../README.md");
  const slidesDataPath = path.resolve(__dirname, "../src/data/slidesData.ts");

  const readmeContent = await fs.readFile(readmePath, "utf-8");
  const slidesDataContent = await fs.readFile(slidesDataPath, "utf-8");

  // Invariant 1: Removed members must not appear in README.md or slidesData.ts
  const forbiddenNames = ["Đào Vĩnh Bảo Phúc", "Tăng Phước Thịnh", "25730053", "25730071"];
  for (const name of forbiddenNames) {
    assert(!readmeContent.includes(name), `README.md should not contain ${name}`);
    assert(!slidesDataContent.includes(name), `slidesData.ts should not contain ${name}`);
  }

  // Invariant 2: README and slidesData must only mention Thanh and Sơn
  assert(readmeContent.includes("Đặng Chí Thanh"), "README.md missing Đặng Chí Thanh");
  assert(readmeContent.includes("Hoàng Cao Sơn"), "README.md missing Hoàng Cao Sơn");

  // Invariant 3: Conflicting/Stale values should be fixed
  // "120k", "131k" and "AI Bền vũ" should NOT exist in slidesData.ts
  assert(!slidesDataContent.includes("120k"), "slidesData.ts should not contain stale value 120k");
  assert(!slidesDataContent.includes("131k"), "slidesData.ts should not contain stale value 131k (should be 131.5k)");
  assert(!slidesDataContent.includes("AI Bền vũ"), "slidesData.ts should not contain typo 'AI Bền vũ'");

  // Invariant 4: Check new expected values in slidesData.ts
  assert(slidesDataContent.includes("131.5k") || slidesDataContent.includes("131,500"), "slidesData.ts missing correct max price 131.5k or 131,500");
  assert(slidesDataContent.includes("14,474") || slidesDataContent.includes("14474"), "slidesData.ts missing correct MAE");
  assert(slidesDataContent.includes("17,874") || slidesDataContent.includes("17874"), "slidesData.ts missing correct RMSE");
  assert(slidesDataContent.includes("-1.2244"), "slidesData.ts missing correct R2");

  console.log("All invariant tests passed!");
}

runTests().catch((err) => {
  console.error("Invariant test failed:", err.message);
  process.exit(1);
});
