import fs from 'fs';
import path from 'path';

const IMAGES_DIR = 'public/images';
const WEBP_QUALITY = 80;

const CONVERTIBLE_EXTS = ['.png', '.jpg', '.jpeg'];

async function convertToWebP() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log(`[INFO] ${IMAGES_DIR}/ does not exist. Nothing to convert.`);
    return;
  }

  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('[INFO] sharp not installed. Run: npm install -D sharp');
    console.log(
      '[INFO] Skipping WebP conversion. This script will be integrated into CI/CD pipeline.'
    );
    return;
  }

  const files = fs
    .readdirSync(IMAGES_DIR, { recursive: true })
    .filter((f) => CONVERTIBLE_EXTS.some((ext) => f.endsWith(ext)))
    .map((f) => path.join(IMAGES_DIR, f));

  if (files.length === 0) {
    console.log('[OK] No PNG/JPG files found to convert.');
    return;
  }

  for (const filePath of files) {
    const parsed = path.parse(filePath);
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

    try {
      const originalStat = fs.statSync(filePath);
      const originalSize = originalStat.size;

      await sharp(filePath, { animated: false }).webp({ quality: WEBP_QUALITY }).toFile(webpPath);

      const webpStat = fs.statSync(webpPath);
      const webpSize = webpStat.size;
      const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

      if (webpSize < originalSize) {
        console.log(
          `[CONVERTED] ${path.basename(filePath)} -> ${path.basename(webpPath)} (${savings}% smaller)`
        );
        fs.unlinkSync(filePath);
        console.log(`[DELETED] Original: ${path.basename(filePath)}`);
      } else {
        console.log(`[KEPT] ${path.basename(filePath)} (WebP was larger, keeping original)`);
        fs.unlinkSync(webpPath);
      }
    } catch (err) {
      console.log(`[ERROR] Failed to convert ${path.basename(filePath)}: ${err.message}`);
    }
  }
}

convertToWebP();
