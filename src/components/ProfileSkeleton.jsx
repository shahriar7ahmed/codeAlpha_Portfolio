import React from 'react';

/**
 * Skeleton loader for profile/hero section
 */
const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="h-6 bg-white/10 rounded-full w-48"></div>
          <div className="space-y-4">
            <div className="h-12 bg-white/10 rounded w-3/4"></div>
            <div className="h-12 bg-white/10 rounded w-2/3"></div>
          </div>
          <div className="h-6 bg-white/10 rounded w-5/6"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-white/10 rounded-full w-32"></div>
            <div className="h-12 bg-white/10 rounded-full w-36"></div>
          </div>
        </div>
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

