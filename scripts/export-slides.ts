import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import { chromium, type Browser } from "playwright";
import { slides } from "../src/data/slidesData";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const buildDir = path.join(projectRoot, ["d", "ist"].join(""));
const exportDir = path.join(projectRoot, "exports");
const slideImageDir = path.join(exportDir, "slides");

const SLIDE_WIDTH = 1200;
const SLIDE_HEIGHT = 675;
const PPTX_WIDTH_IN = 13.333333;
const PPTX_HEIGHT_IN = 7.5;

async function pathExists(targetPath: string) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function startStaticServer() {
  if (!(await pathExists(path.join(buildDir, "index.html")))) {
    throw new Error("Built app not found. Run npm run build before export.");
  }

  const app = express();
  app.use(express.static(buildDir));
  app.get("*", (_req, res) => res.sendFile(path.join(buildDir, "index.html")));

  const server = await new Promise<ReturnType<typeof app.listen>>((resolve) => {
    const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not determine static server address.");
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    }),
  };
}

async function launchBrowser(): Promise<Browser> {
  try {
    return await chromium.launch();
  } catch {
    return chromium.launch({ channel: "chrome" });
  }
}

async function captureSlideImages(baseUrl: string) {
  await fs.rm(slideImageDir, { recursive: true, force: true });
  await fs.mkdir(slideImageDir, { recursive: true });

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage({
      viewport: { width: SLIDE_WIDTH, height: SLIDE_HEIGHT },
      deviceScaleFactor: 1,
    });

    const exportCss = `
      .slide-deck {
        transform: none !important;
        box-shadow: none !important;
        border: 0 !important;
      }
    `;

    const imagePaths: string[] = [];
    for (let index = 0; index < slides.length; index += 1) {
      const slideNumber = index + 1;
      await page.goto(`${baseUrl}/?slide=${slideNumber}`, { waitUntil: "networkidle" });
      await page.addStyleTag({ content: exportCss });
      await page.waitForSelector(".slide-deck");
      await page.waitForFunction(() => document.fonts.ready);
      await page.waitForFunction(() => {
        return Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0);
      });
      await page.waitForTimeout(300);

      const slideElement = page.locator(".slide-deck");
      const imagePath = path.join(
        slideImageDir,
        `${String(slideNumber).padStart(2, "0")}-${slugify(slides[index].title)}.png`,
      );
      await slideElement.screenshot({ path: imagePath });
      imagePaths.push(imagePath);
      console.log(`Captured slide ${slideNumber}/${slides.length}`);
    }

    return imagePaths;
  } finally {
    await browser.close();
  }
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 56);
}

async function writePdf(imagePaths: string[]) {
  const pdf = await PDFDocument.create();

  for (const imagePath of imagePaths) {
    const imageBytes = await fs.readFile(imagePath);
    const pngImage = await pdf.embedPng(imageBytes);
    const page = pdf.addPage([SLIDE_WIDTH, SLIDE_HEIGHT]);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
    });
  }

  const pdfBytes = await pdf.save();
  const outputPath = path.join(exportDir, "ai002-coffee-slide-deck.pdf");
  await fs.writeFile(outputPath, pdfBytes);
  return outputPath;
}

async function writePptx(imagePaths: string[]) {
  const { default: PptxGenJS } = await import("pptxgenjs");
  const deck = new PptxGenJS();
  deck.author = "AI002 Group 22";
  deck.subject = "AI coffee cultivation and price forecasting";
  deck.title = "AI002 Coffee Slide Deck";
  deck.company = "UIT VNU-HCM";
  deck.defineLayout({
    name: "AI002_WIDE",
    width: PPTX_WIDTH_IN,
    height: PPTX_HEIGHT_IN,
  });
  deck.layout = "AI002_WIDE";

  for (const imagePath of imagePaths) {
    const slide = deck.addSlide();
    const imageData = await imagePathToDataUri(imagePath);
    slide.background = { color: "FFFFFF" };
    slide.addImage({
      data: imageData,
      x: 0,
      y: 0,
      w: PPTX_WIDTH_IN,
      h: PPTX_HEIGHT_IN,
    });
  }

  const outputPath = path.join(exportDir, "ai002-coffee-slide-deck.pptx");
  await deck.writeFile({ fileName: outputPath });
  await stripPptxNotes(outputPath);
  return outputPath;
}

async function imagePathToDataUri(imagePath: string) {
  const imageBytes = await fs.readFile(imagePath);
  return `data:image/png;base64,${imageBytes.toString("base64")}`;
}

async function stripPptxNotes(pptxPath: string) {
  const zip = await JSZip.loadAsync(await fs.readFile(pptxPath));

  for (const fileName of Object.keys(zip.files)) {
    if (fileName.startsWith("ppt/notesSlides/") || fileName.startsWith("ppt/notesMasters/")) {
      zip.remove(fileName);
    }
  }

  await rewriteXml(zip, "[Content_Types].xml", (content) => {
    return content.replace(/<Override\b[^>]*PartName="\/ppt\/notes(?:Slides|Masters)\/[^"]+"[^>]*\/>/g, "");
  });

  await rewriteXml(zip, "ppt/presentation.xml", (content) => {
    return content.replace(/<p:notesSz\b[^>]*\/>/g, "");
  });

  const relationshipFiles = Object.keys(zip.files).filter((fileName) => fileName.endsWith(".rels"));
  for (const fileName of relationshipFiles) {
    await rewriteXml(zip, fileName, (content) => {
      return content.replace(/<Relationship\b[^>]*Type="[^"]*\/notes(?:Slide|Master)"[^>]*\/>/g, "");
    });
  }

  const sanitized = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  await fs.writeFile(pptxPath, sanitized);
}

async function rewriteXml(zip: JSZip, fileName: string, rewrite: (content: string) => string) {
  const file = zip.file(fileName);
  if (!file) {
    return;
  }

  const content = await file.async("string");
  zip.file(fileName, rewrite(content));
}

async function main() {
  await fs.mkdir(exportDir, { recursive: true });
  const server = await startStaticServer();

  try {
    const imagePaths = await captureSlideImages(server.baseUrl);
    const [pdfPath, pptxPath] = await Promise.all([
      writePdf(imagePaths),
      writePptx(imagePaths),
    ]);

    console.log(`Exported ${imagePaths.length} slide images`);
    console.log(`PDF: ${pdfPath}`);
    console.log(`PPTX: ${pptxPath}`);
  } finally {
    await server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
