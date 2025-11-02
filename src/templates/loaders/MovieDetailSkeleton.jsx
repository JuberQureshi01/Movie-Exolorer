import React from 'react';
import { Skeleton } from '../../components/ui/skeleton';

function MovieDetailSkeleton() {
  return (
    <div
      className="w-full min-h-screen px-4 sm:px-[5%] py-8 bg-background"
    >
      {/* navigation skeleton */}
      <div className="h-[8vh] flex items-center gap-6">
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>

      {/* content grid skeleton */}
      <div className="flex flex-col lg:flex-row w-full gap-10 mt-8">
        {/* left side poster skeleton */}
        <Skeleton className="w-full lg:w-[30%] h-[65vh] rounded-lg" />

        {/* right side details skeleton */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <Skeleton className="h-12 w-3/4 rounded" />
          <Skeleton className="h-6 w-1/2 rounded" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
          <Skeleton className="h-4 w-1/4 rounded mt-4" />
          <Skeleton className="h-24 w-full rounded" />
          <Skeleton className="h-10 w-48 rounded-lg mt-4" />

          {/* buttons */}
          <div className="flex gap-4 mt-5">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>

          <Skeleton className="h-8 w-1/3 rounded mt-8" />
          <div className="flex gap-4">
            <Skeleton className="h-48 w-40 rounded" />
            <Skeleton className="h-48 w-40 rounded" />
            <Skeleton className="h-48 w-40 rounded" />
            <Skeleton className="h-48 w-40 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailSkeleton;
