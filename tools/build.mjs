// Build du site vitrine : copie site/ vers dist/ sans transformation (pages statiques).
import { cpSync, rmSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
cpSync('site', 'dist', { recursive: true });
console.log('Site copié dans dist/');
