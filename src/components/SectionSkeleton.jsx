import React from 'react';

/**
 * Skeleton loader for sections while they're being lazy loaded
 */
const SectionSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-8 bg-white/10 rounded w-48 mx-auto mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
        <div className="h-4 bg-white/10 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export default SectionSkeleton;

