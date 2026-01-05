#!/usr/bin/env node
// Helper runner that uses npx to execute the TypeScript seed file via ts-node.
// This avoids requiring a global ts-node install; npx will resolve it.
const { spawnSync } = require('child_process');
const path = require('path');

const seedPath = path.join('src', 'db', 'seed.ts');

console.log('Running seed:', seedPath);

// Use ts-node with ESM support to correctly load TS modules with `import` syntax
const res = spawnSync('npx', ['-y', 'ts-node', '--esm', seedPath], { stdio: 'inherit' });

if (res.error) {
  console.error('Failed to run seed:', res.error);
  process.exit(1);
}

process.exit(res.status || 0);
