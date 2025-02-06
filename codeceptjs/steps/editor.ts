const { I, EditorPage } = inject();
import { expect } from '@playwright/test';

type Style = 'жирный' | 'курсив' | 'зачеркнутый';

Given('Я открываю редактор', async () => {
  EditorPage.visit();
  await I.reset();
});

When('Я очищаю поле ввода', async () => {
  await EditorPage.clear();
});

Then('Элемент {string} должен быть пустым', async (locatorName: string) => {
  const content = await I.getTextContent(EditorPage.selectors[locatorName]);
  await expect(content.replace(/\s/g, '')).toBe('');
});

When('Я ввожу текст {string}', async (text: string) => {
  await EditorPage.fill(text);
});

When('Я выделяю текст', async () => {
  await EditorPage.select();
});

When('Я применяю стиль {string}', async (style: Style) => {
  const mappedStyleFunction = {
    жирный: EditorPage.bold,
    курсив: EditorPage.italic,
    зачеркнутый: EditorPage.strikethrough,
    цитата: EditorPage.quote
  };
  await mappedStyleFunction[style]();
});

When(
  'Я ввожу текст {string} при помощи Markdown нотации {string}',
  async (text: string, style: Style) => {
    const mappedStyleMarkdown = {
      жирный: {
        value: '**',
        closing: true
      },
      курсив: {
        value: '*',
        closing: true
      },
      зачеркнутый: {
        value: '~~',
        closing: true
      },
      цитата: {
        value: '>',
        closing: false
      }
    };

    const markdown = mappedStyleMarkdown[style].value;
    const isClosing = mappedStyleMarkdown[style].closing;

    const textToFill = isClosing
      ? `${markdown}${text}${markdown}`
      : `${markdown}${text}`;

    await EditorPage.fill(textToFill);
  }
);

Then(
  'Текст {string} в поле вывода должен быть со стилем {string}',
  async (text: string, style: Style) => {
    const mappedStyleTag = {
      жирный: 'strong',
      курсив: 'em',
      зачеркнутый: 's',
      цитата: 'blockquote'
    };

    const content = await I.getTextContent(
      `${EditorPage.selectors.outputField} ${mappedStyleTag[style]}`
    );
    await expect(content.replace(/\s/g, '')).toBe(text);
  }
);

When('Я добавляю картинку с URL {string}', (url: string) => {
  EditorPage.image(url);
});

Then('В поле вывода появляется картинка с URL {string}', (url: string) => {
  I.seeElement(`${EditorPage.selectors.outputField} img[src="${url}"]`);
});

When('Я добавляю ссылку с URL {string}', (url: string) => {
  EditorPage.link(url);
});

Then('В поле вывода появляется ссылка с URL {string}', (url: string) => {
  I.seeElement(`${EditorPage.selectors.outputField} a[href="${url}"]`);
});
