import axios from 'axios';

const API_KEY = 'demo'; // Replace with your Alpha Vantage API key
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: `${symbol}.BSE`,
        apikey: API_KEY
      }
    });
    
    const data = response.data['Global Quote'];
    if (!data) return null;
    
    return {
      symbol: symbol,
      price: parseFloat(data['05. price']),
      change: parseFloat(data['09. change']),
      changePercent: parseFloat(data['10. change percent'].replace('%', '')),
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
};