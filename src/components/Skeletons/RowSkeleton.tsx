import React from 'react';

import { AuthorSkeleton } from './AuthorSkeleton';

export const RowSkeleton: React.FC = () => {
  return (
    <div className="grid grid-flow-col grid-cols-authors-requests rounded-xl bg-gray-800 text-gray-500 mb-2 shadow-xl px-8">
      <div className="p-3 w-72">
        <AuthorSkeleton />
      </div>
      <div className="p-3 flex items-center justify-start">
        <p className="bg-gray-500 animate-pulse w-11/12 h-3 rounded-xl" />
      </div>
      <div className="p-3 flex items-center justify-center">
        <span className="bg-gray-500 animate-pulse w-20 h-6 rounded-lg" />
      </div>
      <div className="p-3 flex items-center justify-center">
        <span className="bg-gray-500 animate-pulse h-4 w-8 rounded-md mr-2" />
        <span className="bg-gray-500 animate-pulse h-4 w-8 rounded-md mx-2" />
      </div>
    </div>
  );
};
