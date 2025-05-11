import { useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const useInfiniteScroll = ({ loading, page, totalPages, onPageChange }: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLTableRowElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) {
        onPageChange(page + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, page, totalPages, onPageChange]);

  return { lastElementRef };
}; 