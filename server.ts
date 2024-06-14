// server.ts
import express, { Request, Response } from 'express';
import { analyzeData, getAnalysisData } from './analyze';
import './cron'; // Import cron to start the job

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  const data = getAnalysisData();
  res.send(`
    <h1>Analysis Data</h1>
    <p>Total Publications: ${data.totalPublications}</p>
    <p>Average Price: ${data.avgPrice.toFixed(2)} тг.</p>
    <p>Also check console</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  analyzeData(); 
});
