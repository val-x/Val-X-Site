import React from 'react';

const SearchInput = ({ onSearch, isSearching }) => {
  const handleChange = (e) => {
    if (typeof onSearch === 'function') {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search users..."
        onChange={handleChange}
        className="w-full px-4 py-2 pl-10 rounded-lg bg-white/5 border border-white/10 text-white 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
