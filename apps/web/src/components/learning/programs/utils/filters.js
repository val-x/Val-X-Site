export const applyFilters = (programs, filters, searchQuery) => {
  return programs.filter(program => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        program.title.toLowerCase().includes(query) ||
        program.description.toLowerCase().includes(query) ||
        program.topics?.some(topic => topic.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

    // Level filter
    if (filters.level !== 'all' && program.level.toLowerCase() !== filters.level.toLowerCase()) {
      return false;
    }

    // Duration filter
    if (filters.duration !== 'all') {
      const duration = parseInt(program.duration);
      switch (filters.duration) {
        case 'short':
          if (duration > 6) return false;
          break;
        case 'medium':
          if (duration <= 6 || duration > 12) return false;
          break;
        case 'long':
          if (duration <= 12) return false;
          break;
      }
    }

    // Price filter
    if (filters.price !== 'all') {
      if (filters.price === 'free' && program.price !== 'Free') return false;
      if (filters.price === 'paid' && program.price === 'Free') return false;
    }

    // Featured filter
    if (filters.featured && !program.featured) return false;

    return true;
  });
}; 