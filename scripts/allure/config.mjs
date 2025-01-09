import 'dotenv/config';

const config = Object.freeze({
  repoUrl: process.env.ALLURE_REPO_URL,
  branchName: process.env.ALLURE_BRANCH_NAME ?? 'allure-history',
  historyDir: process.env.ALLURE_HISTORY_DIR ?? 'history'
});

export default config;
