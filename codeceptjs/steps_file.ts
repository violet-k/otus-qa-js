const { I } = inject();

export = function () {
  return actor({
    reset: async () => {
      await I.executeScript(async function () {
        localStorage.clear();
        const dbs = await this.indexedDB.databases();

        dbs.forEach((db) => {
          if (db.name) {
            this.indexedDB.deleteDatabase(db.name);
          }
        });
      });

      I.click('.tour-step__button-bar button');
    },
    getTextContent: async (selector: string) => {
      return (await I.usePlaywrightTo('Get text content', async ({ page }) => {
        const element = await page.locator(selector);
        return await element.textContent();
      })) as unknown as string;
    }
  });
};
