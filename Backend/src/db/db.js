import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const defaultData = { professors: [], ratings: [] };
const db = new Low(adapter, defaultData);

await db.read();
if (!db.data) {
  db.data = defaultData;
  await db.write();
}

console.log('Database initialized at:', file);
export default db;