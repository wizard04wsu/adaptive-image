import * as fs from 'fs';
import { cp } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const licenseHeader = '/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */\n';

const __dirname = dirname(fileURLToPath(import.meta.url));
const from = `${__dirname}/../dist/adaptive-image.js`;
const to = `${__dirname}/../docs/adaptive-image.js`;

function prependToFile(filePath, contentToPrepend){
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const updatedContent = contentToPrepend + fileContent;
	fs.writeFileSync(filePath, updatedContent);
}

try{
	// Check if the file exists
	if (!fs.existsSync(from)) {
		throw new Error(`File not found: ${from}`);
	}
	
	// Prepend the license header to the file
	prependToFile(from, licenseHeader);
	console.log('✅ Prepended license header to build:', from);
	
	// Copy the build to the docs folder
	// This is needed for the docs to work in GitHub Pages
	await cp(from, to);
	console.log('✅ Copied build to docs folder:', to);
}
catch(error){
	console.error('❌ Error:', error.message);
	process.exit(1);
}
