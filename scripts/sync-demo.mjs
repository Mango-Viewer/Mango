import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDist = resolve(root, 'src/dist');
const demoDist = resolve(root, 'apps/demo/dist');

console.log(`[sync-demo] root: ${root}`);
console.log(`[sync-demo] source dist: ${srcDist}`);
console.log(`[sync-demo] demo dist: ${demoDist}`);

rmSync(demoDist, { force: true, recursive: true });
mkdirSync(demoDist, { recursive: true });
cpSync(srcDist, demoDist, { recursive: true });

console.log(`[sync-demo] updated demo assets: ${demoDist}`);
