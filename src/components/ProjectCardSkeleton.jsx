import React from 'react';

/**
 * Skeleton loader for project cards
 */
const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 animate-pulse">
      <div className="h-48 bg-white/10"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-white/10 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-white/10 rounded-full w-16"></div>
          <div className="h-6 bg-white/10 rounded-full w-20"></div>
          <div className="h-6 bg-white/10 rounded-full w-14"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;

