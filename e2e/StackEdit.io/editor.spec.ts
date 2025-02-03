import { expect, Page, test } from '@playwright/test';
import { reset } from 'actions';

import { stackEdit } from 'config';

import { EditorPage } from 'pages';

let page: Page;

const TEXT = 'ABC';

test.describe('StackEdit.io - Редактор', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(stackEdit.baseURL);
    await reset(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('очистка поля ввода', async () => {
    const editor = await EditorPage({ page });

    const inputField = await page.locator(editor.selectors.inputField);

    const outputField = await page.locator(editor.selectors.outputField);

    await editor.clear();

    const inputContent = await inputField.textContent();
    const outputContent = await outputField.textContent();

    await expect(inputContent).toBe('\n');
    await expect(outputContent).toBe('');
  });

  test.describe('история документа', () => {
    test.describe.configure({ mode: 'serial' });

    const steps = TEXT.split('').map((value, index) => ({ value, index }));

    const sequence = (
      steps: {
        index: number;
        value: string;
      }[]
    ) => steps.map(({ value }) => value).join('');

    test.beforeAll('создание истории', async () => {
      await page.reload();

      const editor = await EditorPage({ page });

      await editor.type(sequence(steps));

      const undo = await page.locator(editor.selectors.editorButtons.undo);

      await expect(await undo.isDisabled()).toBe(false);
    });

    steps.toReversed().forEach(({ index }) => {
      test(`проход назад (index: ${index})`, async () => {
        const editor = await EditorPage({ page });
        await editor.undo();
        const outputField = await page.locator(editor.selectors.outputField);
        const undo = await page.locator(editor.selectors.editorButtons.undo);

        if (index === 0) {
          await expect(await undo.isDisabled()).toBe(true);
          await expect(await outputField.textContent()).toBe('');
        } else {
          await expect(await outputField.textContent()).toBe(
            `${sequence(steps.slice(0, index))}\n`
          );
        }
      });
    });

    steps.forEach(({ index }) => {
      test(`проход вперед (index: ${index})`, async () => {
        const editor = await EditorPage({ page });
        await editor.redo();
        const outputField = await page.locator(editor.selectors.outputField);
        const redo = await page.locator(editor.selectors.editorButtons.redo);

        if (index === 2) {
          await expect(await redo.isDisabled()).toBe(true);
        }

        await expect(await outputField.textContent()).toBe(
          `${sequence(steps.slice(0, index + 1))}\n`
        );
      });
    });
  });

  test('текст - жирный', async () => {
    const editor = await EditorPage({ page });
    await editor.fill(TEXT);
    await editor.select();
    await editor.bold();

    const outputField = await page.locator(editor.selectors.outputField);
    const boldOutput = await outputField.locator('strong');
    await expect(await boldOutput.innerText()).toBe(TEXT);
  });

  test('текст - курсив', async () => {
    const editor = await EditorPage({ page });
    await editor.fill(TEXT);
    await editor.select();
    await editor.italic();

    const outputField = await page.locator(editor.selectors.outputField);
    const italicOutput = await outputField.locator('em');
    await expect(await italicOutput.innerText()).toBe(TEXT);
  });
});
