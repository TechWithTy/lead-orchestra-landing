/**
 * Generate a new IndexNow key
 * Usage: tsx tools/deploy/generate-indexnow-key.ts
 */

import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const KEY_LENGTH = 32; // 32 bytes = 64 hex characters

function generateKey(): string {
	return randomBytes(KEY_LENGTH).toString('hex');
}

function main() {
	const key = generateKey();
	const publicDir = join(process.cwd(), 'public');
	const keyFileName = `${key}.txt`;
	const keyFilePath = join(publicDir, keyFileName);

	// Write key file
	writeFileSync(keyFilePath, key, 'utf-8');

	console.log('✅ IndexNow key generated successfully!');
	console.log('');
	console.log('Key:', key);
	console.log('Key file:', keyFilePath);
	console.log('Public URL:', `https://leadorchestra.com/${keyFileName}`);
	console.log('');
	console.log('📋 Next steps:');
	console.log('1. Add to .env:');
	console.log(`   INDEXNOW_KEY=${key}`);
	console.log('');
	console.log('2. Add to GitHub Secrets:');
	console.log(`   Name: INDEXNOW_KEY`);
	console.log(`   Value: ${key}`);
	console.log('');
	console.log('3. Commit the key file:');
	console.log(`   git add ${keyFilePath}`);
	console.log(`   git commit -m "Add IndexNow key file"`);
	console.log('');
	console.log('4. Verify after deployment:');
	console.log(`   curl https://leadorchestra.com/${keyFileName}`);
}

if (require.main === module) {
	main();
}

export { generateKey };
