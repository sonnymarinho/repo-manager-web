import React from 'react';

export const AuthorSkeleton: React.FC = () => {
  return (
    <div className="flex animate-pulse w-full max-w-60">
      <div className="bg-gray-400 h-12 w-12 rounded-full mr-3" />
      <div className="flex flex-1 flex-col justify-evenly w-24">
        <p className="bg-gray-400 rounded-md h-3 w-2/4" />
        <p className="bg-gray-500 rounded-md h-3 w-5/6" />
      </div>
    </div>
  );
};
