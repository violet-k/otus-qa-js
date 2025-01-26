import { expect, Page, test } from '@playwright/test';
import { rwa } from 'config';
import { loginUser } from 'framework/actions/RWA';
import { RWAEditorPage } from 'pages';

let page: Page;
const SLUG = 'violet-test-article';

test.describe('RWA Article Editor', () => {
  test.use({ baseURL: rwa.baseURL });
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await loginUser(page);
  });

  test.afterAll(async () => {
    await page.close();
  });
  test('Создание страницы', async () => {
    const editorPage = new RWAEditorPage(page);

    const title = SLUG;
    const about = 'about';
    const content = 'content';
    const tags = ['tag'];

    await editorPage.create({ title, about, content, tags });

    await expect(await page.getByRole('heading')).toContainText(title);
    await expect(
      await page.getByRole('button', { name: 'Delete Article' }).nth(1)
    ).toBeVisible();
  });

  test('Обновление страницы', async () => {
    const editorPage = new RWAEditorPage(page);
    const content = 'content edit';
    const newContent = 'content updated';

    await editorPage.edit(SLUG, content);
    await expect(await page.getByText(content)).toBeVisible();

    await editorPage.edit(SLUG, newContent);
    await page.waitForURL(`/article/${SLUG}`);
    await page.reload();
    await expect(await page.getByText(newContent)).toBeVisible();
  });

  test('Удаление страницы', async () => {
    await page.goto(`/article/${SLUG}`);

    const responsePromise = page.waitForResponse((request) => {
      return (
        request.url().includes('/api/articles') &&
        request.request().method() === 'DELETE'
      );
    });

    page.once('dialog', (dialog) => dialog.accept());

    await Promise.all([
      responsePromise,
      await page.getByRole('button', { name: 'Delete Article' }).nth(1).click(),
      page.waitForURL('/?feed=feed')
    ]);
  });
});
