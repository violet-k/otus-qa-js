const { I } = inject();

const BASE_ACTION_DELAY = 1;

export = {
  selectors: {
    inputField: '.editor__inner',
    outputField: '.preview__inner-2',

    //editor buttons
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
    image: '[title="Image – Ctrl+Shift+G"]',

    imageInputField: '[aria-label="Insert image"] input',
    imageSubmit: '[aria-label="Insert image"] .button--resolve',

    linkInputField: '[aria-label="Insert link"] input',
    linkSubmit: '[aria-label="Insert link"] .button--resolve'
  },

  visit() {
    I.amOnPage('/');
  },

  clear() {
    I.click(this.selectors.inputField);
    I.pressKey(['CommandOrControl', 'A']);
    I.pressKey('Backspace');
    I.wait(BASE_ACTION_DELAY);
  },

  fill(value) {
    I.click(this.selectors.inputField);
    I.pressKey('End');
    I.fillField(this.selectors.inputField, value);
  },

  type(value) {
    I.click(this.selectors.inputField);
    I.pressKey('End');
    I.type(value, BASE_ACTION_DELAY);
  },

  select() {
    I.click(this.selectors.inputField);
    I.pressKey(['CommandOrControl', 'A']);
  },

  undo() {
    I.click(this.selectors.undo);
    I.wait(BASE_ACTION_DELAY);
  },

  redo() {
    I.click(this.selectors.redo);
    I.wait(BASE_ACTION_DELAY);
  },

  bold() {
    I.click(this.selectors.bold);
  },

  italic() {
    I.click(this.selectors.italic);
  },

  strikethrough() {
    I.click(this.selectors.strikethrough);
  },

  quote() {
    I.click(this.selectors.quote);
  },

  image(imgSrc: string) {
    I.click(this.selectors.image);
    I.fillField(this.selectors.imageInputField, imgSrc);
    I.click(this.selectors.imageSubmit);
  },

  link(url: string) {
    I.click(this.selectors.link);
    I.fillField(this.selectors.linkInputField, url);
    I.click(this.selectors.linkSubmit);
  }
};
