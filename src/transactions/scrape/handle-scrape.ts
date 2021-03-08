import * as scrapeIt from 'scrape-it';

export const handleScrape = async (): Promise<TransactionResponse[]> => {
  try {
    const {
      data,
      response,
    }: { data: ScrapeResponse; response: any } = await scrapeIt(
      'https://etherscan.io/txs?ps=100&p=1',
      {
        transactions: {
          listItem: '.table > tbody > tr',
          data: {
            date: '.showDate',
            eth: 'td:nth-last-child(2)',
            // hash: '.myFnExpandBox_searchVal',
            block: '.d-none > a',
            from: 'td:nth-child(6) ',
            to: 'td:nth-child(8)',
          },
        },
      },
    );
    console.log(data);

    if (response.statusCode !== 200) {
      throw new Error();
    }

    const transactions = data.transactions;
    return transactions;
  } catch (e) {
    return null;
  }
};

export interface TransactionResponse {
  date: Date;
  eth: string;
  block: number;
  from: string;
  to: string;
}

export type ScrapeResponse = {
  transactions: TransactionResponse[];
};
