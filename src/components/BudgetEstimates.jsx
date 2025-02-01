import React, { useState, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  budgetEstimates,
  currencies,
  sortOptions,
} from "../data/budgetEstimates";

const BudgetSearch = ({
  searchQuery,
  setSearchQuery,
  selectedCurrency,
  setSelectedCurrency,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400">Price Range:</span>
        </div>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-32 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-400"
          />
          <span className="text-gray-400">to</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-32 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

const BudgetCategory = ({
  category,
  items,
  selectedCurrency,
  searchQuery,
  minPrice,
  maxPrice,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const getNumericPrice = (estimate, currency) => {
    let priceStr = "";
    switch (currency) {
      case "USD":
        priceStr = estimate.usd.replace("$", "").replace(",", "").split("-")[0];
        break;
      case "AED":
        priceStr = estimate.gcc
          .replace("AED ", "")
          .replace(",", "")
          .split("-")[0];
        break;
      default: // INR
        priceStr = estimate.price
          .replace("₹", "")
          .replace(",", "")
          .replace(" lakhs", "")
          .replace(" lakh", "")
          .split("-")[0];
        break;
    }
    return parseFloat(priceStr);
  };

  const getCurrentPrice = (estimate) => {
    switch (selectedCurrency) {
      case "USD":
        return estimate.usd;
      case "AED":
        return estimate.gcc;
      default:
        return estimate.price;
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const estimates = item.estimates.map((est) =>
      getNumericPrice(est, selectedCurrency)
    );
    const minEstimate = Math.min(...estimates);
    const maxEstimate = Math.max(...estimates);

    const matchesPrice =
      (!minPrice || maxEstimate >= parseFloat(minPrice)) &&
      (!maxPrice || minEstimate <= parseFloat(maxPrice));

    return matchesSearch && matchesPrice;
  });

  if (filteredItems.length === 0) return null;

  return (
    <div className="mb-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50"
      >
        <h3 className="text-2xl font-bold text-white">{category}</h3>
        <ChevronDownIcon
          className={`w-8 h-8 text-blue-400 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="p-6 bg-gradient-to-b from-blue-600/10 to-transparent">
                <h4 className="text-xl font-bold text-blue-400 mb-4">
                  {item.title}
                </h4>
                <div className="space-y-4">
                  {item.estimates.map((estimate, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-200 font-medium">
                          {estimate.level}
                        </span>
                        <span className="text-blue-400 font-bold">
                          {getCurrentPrice(estimate)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BudgetEstimates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [sortBy, setSortBy] = useState("price-asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const getNumericPrice = (estimate, currency) => {
    let priceStr = "";
    switch (currency) {
      case "USD":
        priceStr = estimate.usd.replace("$", "").replace(",", "").split("-")[0];
        break;
      case "AED":
        priceStr = estimate.gcc
          .replace("AED ", "")
          .replace(",", "")
          .split("-")[0];
        break;
      default: // INR
        priceStr = estimate.price
          .replace("₹", "")
          .replace(",", "")
          .replace(" lakhs", "")
          .replace(" lakh", "")
          .split("-")[0];
        break;
    }
    return parseFloat(priceStr);
  };

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      if (sortBy.includes("price")) {
        const priceA = getNumericPrice(a.estimates[0], selectedCurrency);
        const priceB = getNumericPrice(b.estimates[0], selectedCurrency);
        return sortBy === "price-asc" ? priceA - priceB : priceB - priceA;
      }
      return sortBy === "name-asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  };

  const filteredAndSortedEstimates = useMemo(() => {
    return budgetEstimates.map((category) => ({
      ...category,
      items: sortItems(category.items),
    }));
  }, [budgetEstimates, selectedCurrency, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
          Budget Estimates
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Transparent pricing for international clients
        </p>
      </div>

      <BudgetSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        sortBy={sortBy}
        setSortBy={setSortBy}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <div className="space-y-6">
        {filteredAndSortedEstimates.map((category, index) => (
          <BudgetCategory
            key={index}
            category={category.category}
            items={category.items}
            selectedCurrency={selectedCurrency}
            searchQuery={searchQuery}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        ))}
      </div>

      <div className="mt-16 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-blue-500/20">
        <p className="text-gray-100 text-center text-lg">
          Note: These are estimated ranges. Final pricing may vary based on
          specific requirements, features, and complexity. Contact us for a
          detailed quote tailored to your needs.
        </p>
      </div>
    </div>
  );
};

export default BudgetEstimates;
