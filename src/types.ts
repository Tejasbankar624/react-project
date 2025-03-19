export interface StockData {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  sector: string;
}

export type SortKey = 'companyName' | 'price' | 'change' | 'changePercent' | 'marketCap';