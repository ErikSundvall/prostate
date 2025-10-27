#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Copy SVG assets from src/assets/ to demo/
 */

async function copyAssets() {
  const srcDir = "src/assets";
  const destDir = "demo";

  try {
    // Ensure destination directory exists
    await Deno.mkdir(destDir, { recursive: true });

    // Read all files in src/assets
    const files = [];
    for await (const entry of Deno.readDir(srcDir)) {
      if (entry.isFile && entry.name.endsWith('.svg')) {
        files.push(entry.name);
      }
    }

    // Copy each SVG file
    for (const file of files) {
      const srcPath = `${srcDir}/${file}`;
      const destPath = `${destDir}/${file}`;
      await Deno.copyFile(srcPath, destPath);
      console.log(`Copied ${srcPath} -> ${destPath}`);
    }

    console.log(`Asset copying complete. ${files.length} files copied.`);
  } catch (error) {
    console.error(`Error copying assets: ${error instanceof Error ? error.message : String(error)}`);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  await copyAssets();
}