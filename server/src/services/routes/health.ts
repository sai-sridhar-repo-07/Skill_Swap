import { Router } from 'express';
import mongoose from 'mongoose';
import { AppDataSource } from '../../db/postgres';

const router = Router();

router.get('/health', async (req, res) => {
  // MongoDB Check
  const mongoStatus = mongoose.connection.readyState === 1 ? 'OK' : 'DOWN';
  const mongoDbName = mongoStatus === 'OK' ? mongoose.connection.name : 'N/A';

  // PostgreSQL Check
  let pgStatus = 'OK';
  let pgDbName = 'N/A';
  let pgHost = 'N/A';
  
  try {
    await AppDataSource.query('SELECT 1'); // Test query
    if (AppDataSource.options.type === 'postgres') {
      pgDbName = AppDataSource.options.database || 'N/A';
      pgHost = (AppDataSource.options as any).host || 'N/A'; // Type-safe cast
    }
  } catch (err: any) {
    pgStatus = `ERROR: ${err.message}`;
  }

  // Determine overall status
  const overallStatus = mongoStatus === 'OK' && pgStatus === 'OK' ? 'HEALTHY' : 'UNHEALTHY';

  res.status(overallStatus === 'HEALTHY' ? 200 : 503).json({
    status: overallStatus,
    databases: {
      mongodb: {
        status: mongoStatus,
        dbName: mongoDbName,
        atlasCluster: mongoStatus === 'OK' ? 'Connected' : 'Disconnected'
      },
      postgresql: {
        status: pgStatus,
        dbName: pgDbName,
        supabaseHost: pgHost
      }
    },
    timestamp: new Date().toISOString()
  });
});

export default router;