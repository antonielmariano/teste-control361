import type { FC } from 'react';
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}
declare const SearchInput: FC<SearchInputProps>;
export default SearchInput;
