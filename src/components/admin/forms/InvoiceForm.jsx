import React, { useState } from "react";
import { motion } from "framer-motion";

const InvoiceForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      invoiceDate: new Date().toISOString().split("T")[0],
      items: [
        {
          description: "Standard Service Rate",
          hours: 47,
          rate: 650,
          isSpecial: false,
        },
      ],
    }
  );

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { description: "", hours: 0, rate: 0, isSpecial: false },
      ],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 mb-2">Invoice Date</label>
          <input
            type="date"
            value={formData.invoiceDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, invoiceDate: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">
            Invoice Number (Optional)
          </label>
          <input
            type="text"
            value={formData.invoiceNumber || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                invoiceNumber: e.target.value,
              }))
            }
            placeholder="Auto-generated if left empty"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Line Items</h3>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddItem}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
              to-fuchsia-500 text-white font-medium"
          >
            Add Item
          </motion.button>
        </div>

        {formData.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-white/5 p-4 rounded-lg"
          >
            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-2">Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Hours</label>
              <input
                type="number"
                value={item.hours}
                onChange={(e) =>
                  handleItemChange(index, "hours", parseFloat(e.target.value))
                }
                min="0"
                step="0.5"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Rate (Rs.)</label>
              <input
                type="number"
                value={item.rate}
                onChange={(e) =>
                  handleItemChange(index, "rate", parseFloat(e.target.value))
                }
                min="0"
                step="50"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={item.isSpecial}
                  onChange={(e) =>
                    handleItemChange(index, "isSpecial", e.target.checked)
                  }
                  className="rounded bg-white/5 border-white/10 text-violet-500 
                    focus:ring-violet-500 focus:ring-offset-0"
                />
                <span>Special Rate</span>
              </label>
              {formData.items.length > 1 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveItem(index)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSubmit(null)}
          className="px-6 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
            to-fuchsia-500 text-white font-medium"
        >
          Generate Invoice
        </motion.button>
      </div>
    </form>
  );
};

export default InvoiceForm;
