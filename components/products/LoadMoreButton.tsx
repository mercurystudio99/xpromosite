import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  currentCount: number;
  totalCount: number;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  loading,
  hasMore,
  onLoadMore,
  currentCount,
  totalCount
}) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">
          You've viewed all {totalCount} products
        </p>
        <div className="w-full h-px bg-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <p className="text-gray-600 mb-4">
        Showing {currentCount} of {totalCount} products
      </p>
      <Button
        onClick={onLoadMore}
        disabled={loading}
        className="rounded-full px-8 py-3 bg-newprimary hover:bg-newprimary/90 text-white font-medium"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Load More Products'
        )}
      </Button>
    </div>
  );
};

export default LoadMoreButton; 