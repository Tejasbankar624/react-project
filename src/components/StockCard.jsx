import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export const StockCard = ({ stock }) => {
  const isPositive = stock.change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{stock.companyName}</h3>
          <p className="text-sm text-gray-500">{stock.symbol}</p>
        </div>
        <span className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
          {stock.sector}
        </span>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-2xl font-bold">₹{stock.price?.toLocaleString() ?? 'N/A'}</p>
          {stock.change != null && (
            <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? 
                <ArrowUpCircle className="w-4 h-4 mr-1" /> : 
                <ArrowDownCircle className="w-4 h-4 mr-1" />
              }
              <span className="font-medium">
                {isPositive ? '+' : ''}{stock.change?.toFixed(2)} ({stock.changePercent?.toFixed(2)}%)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};