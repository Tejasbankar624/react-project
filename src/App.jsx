import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, RefreshCw } from 'lucide-react';
import { StockGrid } from './components/StockGrid';
import { niftyFiftySymbols } from './data';
import { fetchStockData } from './api';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('companyName');
  const [sortOrder, setSortOrder] = useState('desc');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchAllStocks = async () => {
    setLoading(true);
    try {
      const stockData = await Promise.all(
        niftyFiftySymbols.map(async (stock) => {
          const data = await fetchStockData(stock.symbol);
          return {
            ...stock,
            ...data
          };
        })
      );
      setStocks(stockData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllStocks();
    // Refresh every 5 minutes
    const interval = setInterval(fetchAllStocks, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const sortedStocks = useMemo(() => {
    return [...stocks].sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return (a[sortKey] > b[sortKey] ? 1 : -1) * multiplier;
    });
  }, [stocks, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const handleRefresh = () => {
    fetchAllStocks();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LineChart className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Nifty Fifty Dashboard</h1>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StockGrid
          stocks={sortedStocks}
          loading={loading}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;