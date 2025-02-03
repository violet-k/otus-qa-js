import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 5 * 60 * 1000,
  reporter: [
    ['line'],
    ['allure-playwright', { resultsDir: 'reports/allure-results' }]
  ],
  use: {
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: '[Playwright] Дом.РФ',
      testDir: './e2e/Blog',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: '[Playwright] RWA Article',
      testDir: './e2e/RWA',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: '[Playwright] StackEdit.io',
      testDir: './e2e/StackEdit.io',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
