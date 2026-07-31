import { resetDatabase } from './db-reset';

export default async function globalSetup(): Promise<void> {
  await resetDatabase();
}
