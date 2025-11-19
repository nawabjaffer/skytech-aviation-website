#!/usr/bin/env node

/**
 * Generate version metadata for build
 * Creates version.json and injects env variables for cache management
 */

import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';
import { resolve } from 'path';

// Read package.json for version
const packageJson = JSON.parse(
  readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8')
);

// Generate build hash from current timestamp and version
const buildTime = Date.now();
const buildString = `${packageJson.version}-${buildTime}`;
const buildHash = createHash('sha256').update(buildString).digest('hex').substring(0, 12);

// Create version object
const version = {
  version: packageJson.version,
  buildTime,
  hash: buildHash,
  buildDate: new Date(buildTime).toISOString(),
};

// Write version.json to public directory (will be copied to dist)
const versionPath = resolve(process.cwd(), 'public', 'version.json');
writeFileSync(versionPath, JSON.stringify(version, null, 2));

// Write .env.build with version info (will be injected during build)
const envBuildContent = `# Auto-generated build metadata - DO NOT EDIT
VITE_APP_VERSION=${version.version}
VITE_BUILD_TIME=${version.buildTime}
VITE_BUILD_HASH=${version.hash}
VITE_BUILD_DATE=${version.buildDate}
`;

const envBuildPath = resolve(process.cwd(), '.env.build');
writeFileSync(envBuildPath, envBuildContent);

console.log('✓ Version metadata generated:');
console.log(`  Version: ${version.version}`);
console.log(`  Hash: ${version.hash}`);
console.log(`  Build Time: ${version.buildDate}`);
console.log(`  Files created:`);
console.log(`    - ${versionPath}`);
console.log(`    - ${envBuildPath}`);
