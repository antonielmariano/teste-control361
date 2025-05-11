interface UseInfiniteScrollProps {
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export declare const useInfiniteScroll: ({ loading, page, totalPages, onPageChange }: UseInfiniteScrollProps) => {
    lastElementRef: (node: HTMLTableRowElement | HTMLDivElement | null) => void;
};
export {};
