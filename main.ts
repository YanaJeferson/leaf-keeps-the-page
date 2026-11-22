import { chmodSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const output = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

// One still image, written rather than instructed: the leaf keeps a place
// without checking who is reading. No instruction, no request, no performance.
const text = 'The hallway light is left on low. It reaches the bottom step and stops. Whoever left it on has gone to bed.';

if ([...text].length < 1 || [...text].length > 280 || !text.trim()) {
  throw new Error('The entry text must be 1 to 280 non-blank Unicode code points.');
}

// /output is already writable by the sandbox user; chmod on it would fail EPERM.
mkdirSync(output, { recursive: true });

const artifact = join(output, 'entry.txt');
writeFileSync(artifact, text, 'utf8');
chmodSync(artifact, 0o644);
