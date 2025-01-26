import { Page } from '@playwright/test';

export const reset = async (page: Page) => {
  await page.evaluate(() => window.localStorage.clear());

  await page.evaluate(async () => {
    const dbs = await window.indexedDB.databases();

    dbs.forEach((db) => {
      if (db.name) {
        window.indexedDB.deleteDatabase(db.name);
      }
    });
  });
};
