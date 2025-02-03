import { Page } from '@playwright/test';

const BASE_ACTION_DELAY = 1000;

export const selectors = {
  inputField: '.editor__inner',
  outputField: '.preview__inner-2',
  editorButtons: {
    undo: '[title="Undo"]',
    redo: '[title="Redo"]',
    bold: '[title="Bold – Ctrl+Shift+B"]',
    italic: '[title="Italic – Ctrl+Shift+I"]',
    heading: '[title="Heading – Ctrl+Shift+H"]',
    strikethrough: '[title="Strikethrough – Ctrl+Shift+S"]',
    unorderedList: '[title="Unordered list – Ctrl+Shift+U"]',
    orderedList: '[title="Ordered list – Ctrl+Shift+O"]',
    checkList: '[title="Check list – Ctrl+Shift+C"]',
    quote: '[title="Blockquote – Ctrl+Shift+Q"]',
    code: '[title="Code – Ctrl+Shift+K"]',
    table: '[title="Table – Ctrl+Shift+T"]',
    link: '[title="Link – Ctrl+Shift+L"]',
    image: '[title="Image – Ctrl+Shift+G"]'
  }
};

export const EditorPage = async ({ page }: { page: Page }) => {
  const inputField = await page.locator(selectors.inputField);
  const undo = await page.locator(selectors.editorButtons.undo);
  const redo = await page.locator(selectors.editorButtons.redo);
  const bold = await page.locator(selectors.editorButtons.bold);
  const italic = await page.locator(selectors.editorButtons.italic);

  return {
    selectors,
    clear: async () => {
      await inputField.press('Control+A');
      await inputField.press('Delete');
      await page.waitForTimeout(BASE_ACTION_DELAY);
    },
    fill: async (value: string) => {
      await inputField.press('End');
      await inputField.fill(value);
    },
    type: async (value: string) => {
      await inputField.press('End');
      await inputField.pressSequentially(value, {
        delay: BASE_ACTION_DELAY
      });
    },
    select: async () => {
      await inputField.selectText();
    },
    undo: async () => {
      await undo.click();
      await page.waitForTimeout(BASE_ACTION_DELAY);
    },
    redo: async () => {
      await redo.click();
      await page.waitForTimeout(BASE_ACTION_DELAY);
    },
    bold: async () => {
      await bold.click();
    },
    italic: async () => {
      await italic.click();
    }
  };
};
