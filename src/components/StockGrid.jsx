import React from 'react';
import { StockCard } from './StockCard';
import { LoadingSpinner } from './LoadingSpinner';

export const StockGrid = ({ stocks, loading, sortKey, sortOrder, onSort }) => {
  const SortButton = ({ label, sortValue }) => (
    <button
      onClick={() => onSort(sortValue)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
        ${sortKey === sortValue 
          ? 'bg-blue-100 text-blue-700' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
    >
      {label} {sortKey === sortValue && (sortOrder === 'asc' ? '↑' : '↓')}
    </button>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        <SortButton label="Company" sortValue="companyName" />
        <SortButton label="Price" sortValue="price" />
        <SortButton label="Change" sortValue="change" />
        <SortButton label="Change %" sortValue="changePercent" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
};