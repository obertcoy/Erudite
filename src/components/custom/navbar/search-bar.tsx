import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useSearchStore } from '@/hooks/store/use-search-store';
import { SearchResultsEnum } from '@/lib/enum/search-results-enum';
import { useNavigate } from 'react-router';

export default function SearchBar() {
  const {
    searchQuery,
    showDropdown,
    handleSearch,
    setSearchQuery,
    fetchSearchResults,
    toggleDropDown,
  } = useSearchStore((state) => ({
    searchQuery: state.searchQuery ?? '',
    showDropdown: state.showDropdown,
    handleSearch: state.handleSearch,
    setSearchQuery: state.setSearchQuery,
    fetchSearchResults: state.fetchSearchResults,
    toggleDropDown: state.toggleDropdown,
  }));

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery ?? '');

  const debounceDuration = 500;

  useEffect(() => {
    setSearchQuery(debouncedQuery);
    const handler = setTimeout(() => {
      fetchSearchResults();
    }, debounceDuration);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedQuery]);

  const navigate = useNavigate();

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();

    const url = handleSearch('', SearchResultsEnum.NAVIGATE, searchQuery);
    console.log('Url: ' + url);

    if (url) navigate(url);
  };

  return (
    <>
      <form onSubmit={handleNavigate} className="w-full max-w-sm">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setDebouncedQuery(e.target.value)}
            className=" pl-9 pr-4 h-full"
            onFocus={() => toggleDropDown(true)}
            onBlur={() => toggleDropDown(false)}
          />
        </div>
      </form>
    </>
  );
}
