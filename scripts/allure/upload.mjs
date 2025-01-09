import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'zx';
import config from './config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

async function saveHistory() {
  const tempDir = tmpdir();
  const allureResultsDir = path.resolve(__dirname, '../reports/allure-report');
  const historySourcePath = path.join(allureResultsDir, config.historyDir);

  try {
    await fs.remove(tempDir);

    execSync(`git clone -b ${config.branchName} ${config.repoUrl} ${tempDir}`, {
      stdio: 'inherit'
    });

    const historyDestPath = path.join(tempDir, config.historyDir);

    if (await fs.pathExists(historyDestPath)) {
      await fs.remove(historyDestPath);
    }
    await fs.copy(historySourcePath, historyDestPath);

    execSync('git add .', { cwd: tempDir, stdio: 'inherit' });
    execSync(`git commit -m "Update history"`, {
      cwd: tempDir,
      stdio: 'inherit'
    });
    execSync(`git push origin ${config.branchName}`, {
      cwd: tempDir,
      stdio: 'inherit'
    });

    console.log('History успешно сохранена в удалённый репозиторий.');
  } catch (error) {
    console.error('Ошибка при сохранении history:', error);
  } finally {
    await fs.remove(tempDir);
  }
}

await saveHistory();
