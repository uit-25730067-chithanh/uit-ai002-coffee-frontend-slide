import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import { PNG } from "pngjs";
import { slides } from "../src/data/slidesData";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const exportDir = path.join(projectRoot, "exports");
const slideImageDir = path.join(exportDir, "slides");
const pdfPath = path.join(exportDir, "ai002-coffee-slide-deck.pdf");
const pptxPath = path.join(exportDir, "ai002-coffee-slide-deck.pptx");

const SLIDE_WIDTH = 1200;
const SLIDE_HEIGHT = 675;

async function validatePngs() {
  const fileNames = (await fs.readdir(slideImageDir))
    .filter((fileName) => fileName.endsWith(".png"))
    .sort();

  assert.strictEqual(fileNames.length, slides.length, "PNG capture count must match slide count");

  for (const fileName of fileNames) {
    const imagePath = path.join(slideImageDir, fileName);
    const image = PNG.sync.read(await fs.readFile(imagePath));

    assert.strictEqual(image.width, SLIDE_WIDTH, `${fileName} must be 1200px wide`);
    assert.strictEqual(image.height, SLIDE_HEIGHT, `${fileName} must be 675px tall`);
    assert(hasEnoughPixelVariation(image), `${fileName} appears blank or nearly blank`);
  }
}

function hasEnoughPixelVariation(image: PNG) {
  const seen = new Set<string>();
  const step = 40;

  for (let y = 0; y < image.height; y += step) {
    for (let x = 0; x < image.width; x += step) {
      const index = (image.width * y + x) << 2;
      seen.add(`${image.data[index]},${image.data[index + 1]},${image.data[index + 2]}`);
      if (seen.size >= 8) {
        return true;
      }
    }
  }

  return false;
}

async function validatePdf() {
  const pdfBytes = await fs.readFile(pdfPath);
  const pdf = await PDFDocument.load(pdfBytes);
  const pages = pdf.getPages();

  assert.strictEqual(pages.length, slides.length, "PDF page count must match slide count");
  for (const [index, page] of pages.entries()) {
    const { width, height } = page.getSize();
    assert.strictEqual(width, SLIDE_WIDTH, `PDF page ${index + 1} must be 1200pt wide`);
    assert.strictEqual(height, SLIDE_HEIGHT, `PDF page ${index + 1} must be 675pt tall`);
  }
}

async function validatePptx() {
  const pptxBytes = await fs.readFile(pptxPath);
  assert(pptxBytes.length > 10_000, "PPTX output is unexpectedly small");

  const zip = await JSZip.loadAsync(pptxBytes);
  const zipFileNames = Object.keys(zip.files);
  const slideFiles = zipFileNames.filter((fileName) => {
    return /^ppt\/slides\/slide\d+\.xml$/.test(fileName);
  }).sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

  assert.strictEqual(slideFiles.length, slides.length, "PPTX slide count must match slide count");
  assert(!zipFileNames.some((fileName) => fileName.startsWith("ppt/notesSlides/")), "PPTX must not contain notes slides");
  assert(!zipFileNames.some((fileName) => fileName.startsWith("ppt/notesMasters/")), "PPTX must not contain notes masters");

  for (const fileName of slideFiles) {
    const content = await zip.file(fileName)?.async("string");
    assert(content, `${fileName} must be readable`);
    assert(content.includes("<p:pic>"), `${fileName} must contain a full-slide image`);
    assert(content.includes("<a:off x=\"0\" y=\"0\"/>"), `${fileName} image must start at slide origin`);
    assert(content.includes("<a:ext cx=\"12192000\" cy=\"6858000\"/>"), `${fileName} image must fill a 16:9 wide slide`);
    assert(!content.includes(projectRoot), `${fileName} must not leak an absolute local path`);
  }

  const relationshipFiles = zipFileNames.filter((fileName) => fileName.endsWith(".rels"));
  for (const fileName of relationshipFiles) {
    const content = await zip.file(fileName)?.async("string");
    assert(content, `${fileName} must be readable`);
    assert(!/\/notes(?:Slide|Master)"/.test(content), `${fileName} must not reference notes parts`);
    assert(!content.includes(projectRoot), `${fileName} must not leak an absolute local path`);
  }
}

async function main() {
  await validatePngs();
  await validatePdf();
  await validatePptx();
  console.log("Export artifact validation passed!");
}

main().catch((error) => {
  console.error("Export artifact validation failed:", error.message);
  process.exit(1);
});
