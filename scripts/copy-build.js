import { cp } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const from = `${__dirname}/../dist/adaptive-image.js`;
const to = `${__dirname}/../docs/adaptive-image.js`;

await cp(from, to);
console.log('✅ Copied build to docs/');
