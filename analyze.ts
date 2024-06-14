// analyze.ts
import { fetchData, Publication } from './parser';

const previousPublications: Publication[] = [];
let analysisData = {
  totalPublications: 0,
  avgPrice: 0,
};

export const analyzeData = async () => {
  const newPublications = await fetchData();
  const addedPublications = newPublications.filter(newPub => !previousPublications.some(prevPub => prevPub.title === newPub.title));

  previousPublications.push(...addedPublications);

  const totalPublications = previousPublications.length;
  const totalPrices = previousPublications.reduce((acc, curr) => acc + curr.price, 0);
  const avgPrice = totalPublications > 0 ? totalPrices / totalPublications : 0;

  analysisData = {
    totalPublications,
    avgPrice,
  };

  console.log(`Total new publications in the last fetch: ${addedPublications.length}`);
  console.log(`Average price of all publications: ${avgPrice.toFixed(2)} тг.`);
};

export const getAnalysisData = () => analysisData;
