import { execFile } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(import.meta.dirname, '../../.env') });

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(import.meta.dirname, '../..');
const dbMigrateBin = path.join(repoRoot, 'node_modules', '.bin', 'db-migrate');

export async function resetDatabase(): Promise<void> {
  const options = { cwd: repoRoot, env: process.env };

  // Delegates to the backend's db-migrate setup (migrations/) instead of
  // keeping a second copy of the schema in this project.
  await execFileAsync(dbMigrateBin, ['reset', '--force-exit'], options);
  await execFileAsync(dbMigrateBin, ['up', '--force-exit'], options);
}
