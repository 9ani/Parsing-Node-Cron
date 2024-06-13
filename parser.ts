// parser.ts
import puppeteer from 'puppeteer';

export interface Publication {
  title: string;
  price: number;
}

const url = 'https://www.olx.kz/elektronika/tehnika-dlya-kuhni/holodilniki/';

export const fetchData = async (): Promise<Publication[]> => {
  const browser = await puppeteer.launch({
    headless: true, // Set to true for running in production
  });

  const page = await browser.newPage();
  await page.goto(url);

  const publications = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('.css-z3gu2d'), el => el.textContent?.trim() || '');
    const prices = Array.from(document.querySelectorAll('.css-tyui9s.er34gjf0'), el => el.textContent?.trim() || '');

    const publications: Publication[] = [];

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const price = parseFloat(prices[i]?.replace(/[^\d]/g, '') || '0'); // Extract number from price text

      publications.push({ title, price });
    }

    return publications;
  });

  await browser.close();
  return publications;
};
