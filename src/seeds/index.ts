import db from '../config/connection.js';
import cleanDB from './cleanDB.js';


try {
  await db();
  await cleanDB();
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}

