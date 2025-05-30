import React from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SearchInput: React.FC = () => {
  const { searchQuery, setSearchQuery } = useAppContext();

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <Search size={16} className="text-zinc-500" />
      </div>
      <input
        type="text"
        placeholder="Search for songs, artists..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-8 pr-3 py-2 bg-zinc-700 text-white rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchInput;