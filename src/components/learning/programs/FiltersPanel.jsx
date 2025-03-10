import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

// Move these options to a separate config file if needed
export const filterOptions = {
  level: [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ],
  duration: [
    { value: 'all', label: 'Any Duration' },
    { value: '4 weeks', label: '4 weeks' },
    { value: '8 weeks', label: '8 weeks' },
    { value: '12 weeks', label: '12 weeks' }
  ],
  price: [
    { value: 'all', label: 'Any Price' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ]
};

// Filter logic helper function
export const applyFilters = (programs, filters, searchQuery) => {
  let filteredPrograms = [...programs];

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPrograms = filteredPrograms.filter(program => 
      program.title.toLowerCase().includes(query) ||
      program.description.toLowerCase().includes(query)
    );
  }

  // Apply level filter
  if (filters.level !== 'all') {
    filteredPrograms = filteredPrograms.filter(program => 
      program.level === filters.level
    );
  }

  // Apply duration filter
  if (filters.duration !== 'all') {
    filteredPrograms = filteredPrograms.filter(program => 
      program.duration === filters.duration
    );
  }

  // Apply price filter
  if (filters.price !== 'all') {
    filteredPrograms = filteredPrograms.filter(program => 
      program.price === filters.price
    );
  }

  // Apply featured filter
  if (filters.featured) {
    filteredPrograms = filteredPrograms.filter(program => 
      program.featured
    );
  }

  return filteredPrograms;
};

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="relative group">
    <label className="text-sm font-medium text-slate-400 mb-1.5 block">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 
          text-sm sm:text-base text-white appearance-none
          focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 
          transition-all duration-300 hover:border-slate-600/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Select glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-violet-500/10 
        to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
      
      {/* Custom select arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform 
        duration-300 group-hover:translate-y-[-60%]">
        <FiChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
      </div>
    </div>
  </div>
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only peer"
    />
    <div className="relative w-11 h-6 rounded-full transition-all duration-300
      bg-gradient-to-r from-slate-700 to-slate-600
      peer-checked:from-blue-600 peer-checked:to-purple-600
      peer-focus:ring-4 peer-focus:ring-blue-800">
      {/* Switch handle */}
      <div className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full transition-all duration-300
        transform ${checked ? 'translate-x-full bg-white' : 'translate-x-0 bg-slate-300'}
        shadow-lg peer-checked:shadow-blue-500/50`} />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 blur-md" />
    </div>
    <span className="ml-3 text-sm sm:text-base font-medium text-slate-400 
      group-hover:text-slate-300 transition-colors duration-300">
      {label}
    </span>
  </label>
);

const FiltersPanel = ({ filters, setFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Level Filter */}
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Level</label>
          <select
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            className="w-full bg-slate-800 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Duration</label>
          <select
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
            className="w-full bg-slate-800 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">Any Duration</option>
            <option value="short">Short (≤ 6 weeks)</option>
            <option value="medium">Medium (7-12 weeks)</option>
            <option value="long">Long (> 12 weeks)</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Price</label>
          <select
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            className="w-full bg-slate-800 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Featured Toggle */}
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Featured</label>
          <button
            onClick={() => setFilters({ ...filters, featured: !filters.featured })}
            className={`w-full px-4 py-2 rounded-lg transition-colors ${
              filters.featured
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            Featured Only
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FiltersPanel; 