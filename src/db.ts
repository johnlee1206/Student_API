import 'dotenv/config';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing. Check your .env file.');
}

const connectionUrl = new URL(databaseUrl);
const sslMode = connectionUrl.searchParams.get('sslmode')?.toLowerCase();
const usesLibpqCompatibility =
  connectionUrl.searchParams.get('uselibpqcompat')?.toLowerCase() === 'true';
if (
  !usesLibpqCompatibility &&
  (sslMode === 'prefer' || sslMode === 'require' || sslMode === 'verify-ca')
) {
  connectionUrl.searchParams.set('sslmode', 'verify-full');
}

const sslRootCertPath = process.env.DATABASE_SSL_ROOT_CERT;
if (sslRootCertPath) {
  connectionUrl.searchParams.set('sslrootcert', sslRootCertPath);
}

export const pool = new Pool({ connectionString: connectionUrl.toString() });
