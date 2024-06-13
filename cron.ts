import cron from 'node-cron';
import { fetchData } from './parser';
import { analyzeData } from './analyze';

cron.schedule('*/30 * * * *', async () => {
  const publications = await fetchData();
  console.log(`Parsed data at ${new Date().toISOString()}:`);
  console.log(publications);

  await analyzeData(); 
});

console.log('Cron job scheduled to run every 30 minutes.');
