import React from 'react';
import CardSkeleton from './CardSkeleton';

function HomeSkeleton() {
  return (
    <div className="w-full min-h-screen px-4 py-6 md:px-8">
      <div className="grid  lg:grid-cols-5 gap-6">
        {[...Array(12)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default HomeSkeleton;
