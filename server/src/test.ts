// server/test-pg-connection.ts
import { AppDataSource } from './db/postgres';

async function testPostgresConnection() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Supabase PostgreSQL connected successfully!');
    console.log('Connection Details:', {
      // host: AppDataSource.options.host,
      database: AppDataSource.options.database,
      // port: AppDataSource.options.port
    });
    
    // Test a simple query
    const result = await AppDataSource.query('SELECT 1 as test_value');
    console.log('Query Test Result:', result[0].test_value); // Should output: 1
    
    process.exit(0); // Exit on success
  } catch (err:any) {
    console.error('❌ PostgreSQL connection failed:', err.message);
    process.exit(1); // Exit with error
  }
}

testPostgresConnection();