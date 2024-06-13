// analyze.ts
import { fetchData, Publication } from './parser';

const previousPublications: Publication[] = [];

export const analyzeData = async () => {
  const newPublications = await fetchData();
  const addedPublications = newPublications.filter(newPub => !previousPublications.some(prevPub => prevPub.title === newPub.title));

  previousPublications.push(...addedPublications);

  const totalPublications = addedPublications.length;
  const totalPrices = previousPublications.reduce((acc, curr) => acc + curr.price, 0);
  const avgPrice = previousPublications.length > 0 ? totalPrices / previousPublications.length : 0;

  console.log(`Total new publications in the last fetch: ${totalPublications}`);
  console.log(`Average price of all publications: ${avgPrice.toFixed(2)} тг.`);

  previousPublications.splice(0, previousPublications.length - totalPublications);
};
