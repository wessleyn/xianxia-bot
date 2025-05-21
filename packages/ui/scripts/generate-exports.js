#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

const fs = require('fs');
const path = require('path');

// Paths
const componentsDir = path.join(__dirname, '../src/components');
const hooksDir = path.join(__dirname, '../src/hooks');
const indexPath = path.join(__dirname, '../src/index.tsx');
const hooksIndexPath = path.join(__dirname, '../src/hooks/index.ts');

// Function to get directories
function getDirectories(srcPath) {
    try {
        return fs.readdirSync(srcPath)
            .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
    } catch (err) {
        // If directory doesn't exist, return empty array
        if (err.code === 'ENOENT') {
            return [];
        }
        throw err;
    }
}

// Generate exports content for components
function generateComponentsIndexContent() {
    const components = getDirectories(componentsDir);

    let content = '// This file is auto-generated. Do not edit directly.\n\n';

    // Add component exports
    if (components.length > 0) {
        content += '// Component exports\n';
        components.forEach(component => {
            content += `export * from './components/${component}';\n`;
        });
        content += '\n';
    }

    return content;
}

// Generate a separate index.ts file for hooks
function generateHooksIndexContent() {
    const hooks = getDirectories(hooksDir);

    let content = '// This file is auto-generated. Do not edit directly.\n\n';

    // Add hook exports
    if (hooks.length > 0) {
        hooks.forEach(hook => {
            content += `export * from './${hook}';\n`;
        });
    }

    return content;
}

// Write the components index file
const componentsIndexContent = generateComponentsIndexContent();
fs.writeFileSync(indexPath, componentsIndexContent);

// Ensure hooks directory exists
if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
}

// Write the hooks index file if there are hooks
const hooks = getDirectories(hooksDir);
if (hooks.length > 0) {
    const hooksIndexContent = generateHooksIndexContent();
    fs.writeFileSync(hooksIndexPath, hooksIndexContent);
    console.log('✅ Generated hooks/index.ts with exports for all hooks');
}

console.log('✅ Generated index.tsx with exports for all components');
