import React from 'react';
import { Skeleton } from '../../components/ui/skeleton';


function CardSkeleton() {
  return (
    <div className="w-full flex flex-col gap-3 px-6 md:px-3">
      <Skeleton className="h-[50vh] md:h-[40vh] w-full rounded-lg" />
      <Skeleton className="h-6 w-3/4 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
    </div>
  );
}

export default CardSkeleton;
