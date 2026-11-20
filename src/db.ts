import 'dotenv/config';
import { Pool, type PoolConfig } from 'pg';

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

const sslRootCert = process.env.DATABASE_SSL_ROOT_CERT?.trim();
const poolOptions: PoolConfig = {
  connectionString: connectionUrl.toString()
};

if (sslRootCert?.startsWith('-----BEGIN CERTIFICATE-----')) {
  connectionUrl.searchParams.delete('sslmode');
  connectionUrl.searchParams.delete('sslrootcert');
  poolOptions.connectionString = connectionUrl.toString();
  poolOptions.ssl = { ca: sslRootCert, rejectUnauthorized: true };
} else if (sslRootCert) {
  connectionUrl.searchParams.set('sslrootcert', sslRootCert);
  poolOptions.connectionString = connectionUrl.toString();
}

export const pool = new Pool(poolOptions);
