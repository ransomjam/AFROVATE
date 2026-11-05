import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sourceImages = [
  { file: 'Afrovate Apps Office Showcase.png', slug: 'apps-showcase' },
  { file: 'Collaborative Office Strategy Meeting.png', slug: 'strategy-meeting' },
  { file: 'Collaborative Teamwork Around a Laptop.png', slug: 'team-collaboration' },
  { file: 'Confident Gaze Over the Sunset Skyline.png', slug: 'executive-vision' },
  { file: 'Creative Marketing Workspace.png', slug: 'marketing-workspace' },
  { file: 'Focused Developer at Work.png', slug: 'developer-work' },
  { file: 'Golden Hour Downtown Skyline.png', slug: 'downtown-skyline' },
  { file: 'Thoughtful AI Hologram in the Lab.png', slug: 'ai-innovation' },
];

async function run() {
  for (const item of sourceImages) {
    const inputPath = path.resolve(item.file);
    if (!fs.existsSync(inputPath)) {
      console.warn(`Missing ${inputPath}`);
      continue;
    }
    const meta = await sharp(inputPath).metadata();
    console.log(`Processing ${item.file} (${meta.width}x${meta.height})...`);

    // Full desktop WebP (max width 1600, high quality)
    await sharp(inputPath)
      .resize({ width: Math.min(meta.width || 1600, 1600), withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(path.join(outDir, `${item.slug}.webp`));

    // Mobile responsive WebP (width 800)
    await sharp(inputPath)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, `${item.slug}-mobile.webp`));
  }

  // Create dedicated crops from 'Afrovate Apps Office Showcase.png' for individual venture devices
  const showcasePath = path.resolve('Afrovate Apps Office Showcase.png');
  if (fs.existsSync(showcasePath)) {
    const meta = await sharp(showcasePath).metadata();
    const W = meta.width || 1408;
    const H = meta.height || 792;

    // 1. AfroDocs (Center Laptop)
    await sharp(showcasePath)
      .extract({
        left: Math.round(W * 0.25),
        top: Math.round(H * 0.10),
        width: Math.round(W * 0.52),
        height: Math.round(H * 0.76),
      })
      .webp({ quality: 88 })
      .toFile(path.join(outDir, 'venture-afrodocs.webp'));

    // 2. Camtinel (Right Burgundy Phone)
    await sharp(showcasePath)
      .extract({
        left: Math.round(W * 0.67),
        top: Math.round(H * 0.34),
        width: Math.round(W * 0.18),
        height: Math.round(H * 0.52),
      })
      .webp({ quality: 88 })
      .toFile(path.join(outDir, 'venture-camtinel.webp'));

    // 3. Camiv (Left Tablet)
    await sharp(showcasePath)
      .extract({
        left: Math.round(W * 0.01),
        top: Math.round(H * 0.31),
        width: Math.round(W * 0.33),
        height: Math.round(H * 0.48),
      })
      .webp({ quality: 88 })
      .toFile(path.join(outDir, 'venture-camiv.webp'));

    // 4. UbaTechCamp (Far Right Phone)
    await sharp(showcasePath)
      .extract({
        left: Math.round(W * 0.81),
        top: Math.round(H * 0.30),
        width: Math.round(W * 0.18),
        height: Math.round(H * 0.55),
      })
      .webp({ quality: 88 })
      .toFile(path.join(outDir, 'venture-ubatechcamp.webp'));

    console.log('Created individual venture device crops!');
  }
}

run().catch(console.error);
