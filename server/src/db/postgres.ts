import { DataSource } from 'typeorm';
import { CreditAccount } from '../models/pg/CreditAccount'
import { CreditTransaction } from '../models/pg/CreditTransaction';

export const AppDataSource = new DataSource({
  type: 'postgres', // Must explicitly specify
  host: process.env.PG_HOST || "db.gonnlfbqxyvksqywivrh.supabase.co",
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || '6309816942', // Required
  database: process.env.PG_DB || 'postgres',
  synchronize: true, // Disable in production
  ssl: { 
    rejectUnauthorized: false // Critical for Supabase
  },
  logging: ['error'],// Enable logs
  entities: [CreditAccount,CreditTransaction]
});

// Add connection test
export const connectPostgres = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Supabase PostgreSQL connected');
    console.log(`   Host: ${AppDataSource.options}`); // Verify host
  } catch (err: any) {
    console.error('❌ Supabase connection failed:', err.message);
    process.exit(1); // Crash app if DB is essential
  }
};