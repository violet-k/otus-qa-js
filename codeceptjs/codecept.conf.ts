const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.CI || process.env.HEADLESS);

exports.config = {
  name: 'CodeceptJS',
  tests: './**/*.spec.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://stackedit.io/app#',
      show: true,
      restart: 'session',
      keepBrowserState: true
    }
  },
  include: {
    I: './steps_file.ts',
    EditorPage: './pages/StackEdit.io/EditorPage.ts'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: './steps/**/*.ts'
  },
  plugins: {
    screenshotOnFail: { enabled: true },
    tryTo: { enabled: true },
    retryFailedStep: { enabled: true },
    retryTo: { enabled: true },
    eachElement: { enabled: true },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [
    { pattern: 'wait.*', timeout: 0 },
    { pattern: 'amOnPage', timeout: 0 }
  ]
};
