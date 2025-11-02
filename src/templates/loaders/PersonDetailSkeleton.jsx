import React from "react";
import { Skeleton } from "../../components/ui/skeleton";
function PersonDetailSkeleton() {
  return (
    <div className="px-4 sm:px-[5%] w-full flex flex-col bg-background min-h-screen py-8">
      {/* Navbar */}
      <nav className="h-[8vh] flex items-center gap-3">
        <Skeleton className="h-6 w-20 rounded" />
      </nav>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
        {/* Left Section - Image + Personal Info */}
        <div className="flex flex-col items-center lg:items-start">
          {/* Profile Image */}
          <Skeleton className="w-[80%] lg:w-full max-h-[65vh] h-[65vh] rounded-lg" />

          {/* Divider */}
          <hr className="mt-5 border-border w-full h-px" />

          {/* Social Links */}
          <div className="text-2xl flex gap-4 mt-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          {/* Personal Info */}
          <div className="mt-5 w-full space-y-3">
            <Skeleton className="h-6 w-1/3 rounded" /> {/* Personal Info heading */}
            <Skeleton className="h-4 w-3/4 rounded" /> {/* Known For */}
            <Skeleton className="h-4 w-2/3 rounded" /> {/* Gender */}
            <Skeleton className="h-4 w-1/2 rounded" /> {/* Birthday */}
            <Skeleton className="h-4 w-3/4 rounded" /> {/* Place of Birth */}
            <Skeleton className="h-4 w-1/3 rounded" /> {/* Deathday (optional) */}
          </div>
        </div>

        {/* Right Section - Details & Credits */}
        <div className="w-full">
          {/* Name */}
          <Skeleton className="h-12 w-2/3 rounded mb-5" />

          {/* Biography */}
          <Skeleton className="h-6 w-1/3 rounded mb-3" />
          <div className="space-y-2 mb-8">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/6 rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>

          {/* Known For Section */}
          <Skeleton className="h-8 w-1/4 rounded mb-4" />
          <div className="flex gap-4 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className="h-48 w-40 rounded-lg shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetailSkeleton;
