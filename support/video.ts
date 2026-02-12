import * as fs from 'fs';
import * as path from 'path';

const VIDEOS_DIR = 'test-results/videos';

export function getVideosDir() {
  return VIDEOS_DIR;
}

export function ensureVideosDir() {
  if (!fs.existsSync(VIDEOS_DIR)) {
    fs.mkdirSync(VIDEOS_DIR, { recursive: true });
  }
}

export function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .slice(0, 80);
}

export function buildVideoFilePath(scenarioName: string) {
  ensureVideosDir();

  const safeName = sanitizeFileName(scenarioName) || 'scenario';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  return path.join(VIDEOS_DIR, `${safeName}-${timestamp}.webm`);
}

export function cleanOldVideos(daysOld: number = 7) {
  const now = Date.now();
  const maxAge = daysOld * 24 * 60 * 60 * 1000;

  if (!fs.existsSync(VIDEOS_DIR)) return;

  fs.readdirSync(VIDEOS_DIR).forEach(file => {
    const filepath = path.join(VIDEOS_DIR, file);
    const stats = fs.statSync(filepath);

    if (now - stats.mtimeMs > maxAge) {
      fs.unlinkSync(filepath);
    }
  });
}
