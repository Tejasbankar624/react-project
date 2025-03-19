import React, { useState, useMemo } from 'react';
import { LineChart } from 'lucide-react';
import { StockGrid } from './components/StockGrid';
import { niftyFiftyData } from './data';
import type { SortKey } from './types';

function App() {
  const [sortKey, setSortKey] = useState<SortKey>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedStocks = useMemo(() => {
    return [...niftyFiftyData].sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return (a[sortKey] > b[sortKey] ? 1 : -1) * multiplier;
    });
  }, [sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <LineChart className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Nifty Fifty Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StockGrid
          stocks={sortedStocks}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Data is for demonstration purposes only. Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;