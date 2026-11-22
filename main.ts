import { chmodSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const output = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const text = 'A leaf keeps the page in the book on the sill. It has done this every afternoon for years and has never once looked up to see who is reading.';

if ([...text].length < 1 || [...text].length > 280 || !text.trim()) {
  throw new Error('The entry text must be 1 to 280 non-blank Unicode code points.');
}

mkdirSync(output, { recursive: true, mode: 0o755 });
chmodSync(output, 0o755);

const artifact = join(output, 'entry.txt');
writeFileSync(artifact, text, 'utf8');
chmodSync(artifact, 0o644);
