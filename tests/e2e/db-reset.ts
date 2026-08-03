import { execFile } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(__dirname, '../..');
const dbMigrateBin = path.join(repoRoot, 'node_modules', '.bin', 'db-migrate');

export async function resetDatabase(): Promise<void> {
  const options = { cwd: repoRoot, env: process.env };

  // Roll every applied migration back, then reapply them, so the schema is
  // always defined once in migrations/ instead of duplicated per test setup.
  await execFileAsync(dbMigrateBin, ['reset', '--force-exit'], options);
  await execFileAsync(dbMigrateBin, ['up', '--force-exit'], options);
}
