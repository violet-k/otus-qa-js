import { expect, test } from '@playwright/test';

const selectors = {
  breadcrumbs: '#bread-crumbs',
  breadcrumbs_item: '.bread-crumbs__link',
  content: '.blog__content-article',
  content_title: '#blog-title',
  content_heading: '[id^="blog__title-"]',
  contents: '.blog-contents',
  contents_item: '.blog-contents__link',
  contents_share: '.blog-contents__share',
  contents_share_copy: '.ya-share2__link_copy',
  related: '#related-articles',
  related_all: '#related-articles h2 + .button',
  feedback: '.feedback'
};

const URL =
  'https://domrfbank.ru/blog/khochu-postroit-dom-kak-poluchit-kredit-na-stroitelstvo/';

const paths = {
  blog: '/blog/',
  blog_all: '/blog/all/'
};

test.describe('Дом.РФ - Блог - Статья', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('присутствуют обязательные блоки', async ({ page }) => {
    await page.locator(selectors.breadcrumbs);
    await page.locator(selectors.content);
    await page.locator(selectors.contents);
    await page.locator(selectors.related);
    await page.locator(selectors.feedback);
  });

  test('хлебные крошки - клик по крошке', async ({ page }) => {
    const last = await page.locator(selectors.breadcrumbs_item).nth(-1);
    const preLast = await page.locator(selectors.breadcrumbs_item).nth(-2);
    const title = await page.locator(selectors.content_title);

    await expect(await last.textContent()).toBe(await title.textContent());

    await preLast.click();
    await expect(page.url().endsWith(paths.blog_all)).toBe(true);
  });

  test('содержание - переход к заголовку', async ({ page }) => {
    const lastContentsItem = await page.locator(selectors.contents_item).last();
    const lastHeadingItem = await page
      .locator(selectors.content_heading)
      .last();

    await lastContentsItem.click();

    await expect(lastHeadingItem).toBeVisible();
  });

  test('содержание - поделиться - скопировать ссылку', async ({
    page,
    context
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const share = await page.locator(selectors.contents_share);
    await share.click();

    const copy = await page.locator(selectors.contents_share_copy);
    await copy.click();

    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText()
    );

    await expect(clipboardContent).toBe(URL);
  });

  test('похожие статьи - все статьи', async ({ page }) => {
    const allArticles = await page.locator(selectors.related_all);

    await allArticles.click();

    await expect(page.url().endsWith(paths.blog_all)).toBe(true);
  });
});
