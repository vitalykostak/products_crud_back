import fs from 'fs';
import pg from 'pg';
import path from 'path';

let credentials = null;

try {
  const fileName = path.join(path.resolve(''), 'database.json');
  const data = fs.readFileSync(fileName, { encoding: 'utf-8' });
  credentials = JSON.parse(data).dev;
} catch (e) {
  console.log(e);
}

const pool = new pg.Pool({
  user: credentials.user,
  host: credentials.host,
  database: credentials.database,
  password: credentials.password,
  port: credentials.port,
  ssl: credentials.ssl,
});

export default pool;
