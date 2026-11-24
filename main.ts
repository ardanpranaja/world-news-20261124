// world-news-20261124 — entrypoint.
//
// The front page lives next to this file as entry.png (1024x1024, designed in
// design/ and rendered with HyperFrames). This program is the only thing the
// grader runs: it reads that image, checks it is really a PNG of an allowed
// size, and drops it into the output directory as entry.png so the judge sees
// exactly those bytes.
//
// Usage outside the grader container:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The eight magic bytes every PNG file starts with.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// The competition gate accepts a single image of at most 1 MiB.
const MAX_IMAGE_BYTES = 1024 * 1024;

const SOURCE_NAME = 'entry.png';

// Where the grader expects the finished image. Locally we fall back to the
// MAKEFUN_OUTPUT_DIR stand-in; inside the grader container it is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, SOURCE_NAME);

  let image;
  try {
    image = readFileSync(sourcePath);
  } catch (err) {
    fail(`could not read ${SOURCE_NAME} next to main.ts (${err.code ?? err.message})`);
  }

  // Reject anything that is not a PNG before it ever reaches the judge.
  if (image.length < PNG_SIGNATURE.length || !image.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
    fail(`${SOURCE_NAME} does not start with the PNG signature — not a PNG file`);
  }

  // The gate caps entries at 1 MiB; a bigger file would be refused outright.
  if (image.length > MAX_IMAGE_BYTES) {
    fail(`${SOURCE_NAME} is ${image.length} bytes, over the ${MAX_IMAGE_BYTES}-byte limit`);
  }

  mkdirSync(outputDir, { recursive: true });
  const targetPath = join(outputDir, SOURCE_NAME);

  try {
    writeFileSync(targetPath, image, { mode: 0o644 });
    // writeFileSync's mode is still masked by the process umask, so set the
    // permissions explicitly: the judge must be able to read the file as any user.
    chmodSync(targetPath, 0o644);
  } catch (err) {
    fail(`could not write ${targetPath} (${err.code ?? err.message})`);
  }

  console.log(`wrote ${targetPath} (${image.length} bytes)`);
}

main();
