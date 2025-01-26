#!/usr/bin/env zx

import fs from 'fs-extra';
import { $ } from 'zx';

const ALLURE_RESULT_PATH =
  process.env.ALLURE_RESULT_PATH ?? './reports/allure-results';
const ALLURE_REPORT_PATH =
  process.env.ALLURE_REPORT_PATH ?? './reports/allure-report';

await fs.remove(ALLURE_RESULT_PATH);

const { exitCode: exitCodeJest } = await $`pnpm test`.nothrow();
const { exitCode: exitCodePlaywright } = await $`pnpm test:e2e:ci`.nothrow();
const exitCode = exitCodeJest || exitCodePlaywright;
const result = exitCode === 0 ? '🟢 Tests passed\n' : '🔴 Tests failed\n';

await $`node scripts/allure/load.mjs`;
await $`npx allure generate ${ALLURE_RESULT_PATH} --clean --report-dir ${ALLURE_REPORT_PATH}`;
await $`node scripts/allure/upload.mjs`;
await $`echo "result='${result}'" >> "$GITHUB_OUTPUT"`;

process.exit(exitCode);
