import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 30000, workers: 1,
  use: { baseURL: process.env.QA_BASE_URL || 'http://127.0.0.1:4322', headless: true },
  webServer: process.env.QA_BASE_URL ? undefined : {
    command: 'python -m http.server 4322 --bind 127.0.0.1 --directory dist',
    url: 'http://127.0.0.1:4322', reuseExistingServer: false,
  },
  reporter: 'list',
});
