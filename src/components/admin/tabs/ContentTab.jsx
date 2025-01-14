import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDocument } from "../../../contexts/DocumentContext";
import {
  DOCUMENT_TYPES,
  DOCUMENT_TEMPLATES,
  generateInvoiceContent,
} from "../templates/documentTemplates";
import InvoiceForm from "../forms/InvoiceForm";

const ContentTab = ({ contentItems, setShowAddContentModal, itemVariants }) => {
  // Add state for filtering and sorting
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date"); // 'date', 'title', 'type'
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [activeDocumentType, setActiveDocumentType] = useState(null);
  const [documentContent, setDocumentContent] = useState("");
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const { setDocuments } = useDocument();

  useEffect(() => {
    setDocuments(contentItems);
    localStorage.setItem("documents", JSON.stringify(contentItems));
  }, [contentItems]);

  // Filter and sort content items
  const filteredAndSortedItems = useCallback(() => {
    return contentItems
      .filter((item) => {
        const matchesStatus =
          selectedStatus === "all" || item.status === selectedStatus;
        const matchesType =
          selectedType === "all" || item.type === selectedType;
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesType && matchesSearch;
      })
      .sort((a, b) => {
        const order = sortOrder === "asc" ? 1 : -1;
        switch (sortBy) {
          case "title":
            return order * a.title.localeCompare(b.title);
          case "type":
            return order * a.type.localeCompare(b.type);
          default: // date
            return order * (new Date(b.updatedAt) - new Date(a.updatedAt));
        }
      });
  }, [
    contentItems,
    selectedStatus,
    selectedType,
    searchQuery,
    sortBy,
    sortOrder,
  ]);

  // Handle bulk actions
  const handleBulkAction = (action) => {
    switch (action) {
      case "publish":
        toast.success(`Published ${selectedItems.length} items`);
        break;
      case "archive":
        toast.success(`Archived ${selectedItems.length} items`);
        break;
      case "delete":
        toast.success(`Deleted ${selectedItems.length} items`);
        break;
      default:
        break;
    }
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  // Handle content actions
  const handleEdit = (content) => {
    setSelectedContent(content);
    setShowEditModal(true);
  };

  const handlePreview = (content) => {
    localStorage.setItem("documents", JSON.stringify(contentItems));
    navigate(`/admin/content/preview/${content.id}`);
  };

  const handleDelete = (content) => {
    setSelectedContent(content);
    setShowDeleteModal(true);
  };

  // Add document content handler
  const handleDocumentTypeChange = (type) => {
    setActiveDocumentType(type);
    setDocumentContent(DOCUMENT_TEMPLATES[type]?.defaultContent || "");
  };

  // Add form submission handler
  const handleFormSubmit = (data) => {
    // Generate document content using templates and form data
    const content = generateDocumentContent(data);
    setDocumentContent(content);
    toast.success("Document generated successfully");
  };

  const EditContentModal = () => {
    const [title, setTitle] = useState(selectedContent?.title || "");
    const [type, setType] = useState(
      selectedContent?.type || DOCUMENT_TYPES.BUSINESS_PROPOSAL
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedContent = {
        ...selectedContent,
        title,
        type,
        content: documentContent,
        updatedAt: new Date().toISOString(),
      };
      // Update content in parent component
      const updatedItems = contentItems.map((item) =>
        item.id === selectedContent.id ? updatedContent : item
      );
      setDocuments(updatedItems);
      localStorage.setItem("documents", JSON.stringify(updatedItems));
      setShowEditModal(false);
      toast.success("Content updated successfully");
    };

    const handleInvoiceSubmit = (data) => {
      if (!data) {
        setShowEditModal(false);
        return;
      }

      const invoiceContent = generateInvoiceContent(data);
      const updatedContent = selectedContent
        ? {
            ...selectedContent,
            title: title || `Invoice - ${new Date().toLocaleDateString()}`,
            type: DOCUMENT_TYPES.INVOICE,
            content: invoiceContent,
            formData: data,
            updatedAt: new Date().toISOString(),
          }
        : {
            id: Date.now(),
            title: title || `Invoice - ${new Date().toLocaleDateString()}`,
            type: DOCUMENT_TYPES.INVOICE,
            content: invoiceContent,
            formData: data,
            status: "Draft",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

      // Update or add content
      const updatedItems = selectedContent
        ? contentItems.map((item) =>
            item.id === selectedContent.id ? updatedContent : item
          )
        : [...contentItems, updatedContent];

      setDocuments(updatedItems);
      localStorage.setItem("documents", JSON.stringify(updatedItems));
      setShowEditModal(false);
      toast.success(
        selectedContent
          ? "Invoice updated successfully"
          : "Invoice created successfully"
      );
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full mx-4"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedContent ? "Edit Content" : "Create New Content"}
            </h2>
            <button
              onClick={() => setShowEditModal(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
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
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Document Type</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                handleDocumentTypeChange(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              {Object.values(DOCUMENT_TYPES).map((docType) => (
                <option key={docType} value={docType}>
                  {docType}
                </option>
              ))}
            </select>
          </div>

          {type === DOCUMENT_TYPES.INVOICE ? (
            <InvoiceForm
              onSubmit={handleInvoiceSubmit}
              initialData={selectedContent?.formData}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Content</label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: documentContent }}
                    onInput={(e) =>
                      setDocumentContent(e.currentTarget.innerHTML)
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                      overflow-y-auto max-h-[600px]"
                  />
                  <div className="bg-white/5 rounded-lg p-4 prose prose-invert max-w-none overflow-y-auto max-h-[600px]">
                    <div
                      dangerouslySetInnerHTML={{ __html: documentContent }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  {DOCUMENT_TEMPLATES[type]?.sections?.map((section) => (
                    <button
                      key={section}
                      type="button"
                      onClick={() =>
                        setDocumentContent((prev) => `${prev}\n\n## ${section}`)
                      }
                      className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 text-sm"
                    >
                      + {section}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
                      to-fuchsia-500 text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    );
  };

  const PreviewContentModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {selectedContent?.title}
            </h2>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">{selectedContent?.type}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedContent?.status === "Published"
                    ? "bg-green-500/20 text-green-300"
                    : selectedContent?.status === "Draft"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-blue-500/20 text-blue-300"
                }`}
              >
                {selectedContent?.status}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowPreviewModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        <div className="preview-content bg-white/5 rounded-lg p-8 prose prose-invert max-w-none">
          {selectedContent?.type in DOCUMENT_TYPES ? (
            <div
              className="document-preview"
              dangerouslySetInnerHTML={{
                __html:
                  selectedContent?.content ||
                  DOCUMENT_TEMPLATES[selectedContent?.type]?.defaultContent,
              }}
            />
          ) : (
            <div className="text-gray-400">
              No preview available for this content type.
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => handleEdit(selectedContent)}
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
          >
            Edit Document
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                // Add download functionality here
                toast.success("Document downloaded successfully");
              }}
              className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
            >
              Download
            </button>
            <button
              onClick={() => setShowPreviewModal(false)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
                to-fuchsia-500 text-white"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Add some CSS styles for the preview content
  const previewStyles = `
    .preview-content {
      font-family: 'Inter', sans-serif;
    }

    .preview-content h1 {
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .preview-content h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      margin-top: 2rem;
    }

    .preview-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      margin-top: 1.5rem;
    }

    .preview-content p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .preview-content ul {
      list-style-type: disc;
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    .preview-content table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }

    .preview-content th,
    .preview-content td {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1rem;
    }

    .preview-content th {
      background-color: rgba(255, 255, 255, 0.05);
      font-weight: 600;
    }

    .preview-content .signature-line {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: 2rem;
      padding-top: 1rem;
    }

    .preview-content .company-info,
    .preview-content .recipient-info {
      margin-bottom: 2rem;
    }

    .preview-content .header {
      margin-bottom: 2rem;
    }

    .preview-content .footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  `;

  // Add the styles to the document head
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = previewStyles;
  document.head.appendChild(styleSheet);

  // Update the content grid buttons
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Content Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddContentModal(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
            to-fuchsia-500 text-white font-medium"
        >
          New Content
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg bg-white/5 border border-white/10 
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="all">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Review">Review</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="all">All Types</option>
          {Object.values(DOCUMENT_TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [newSortBy, newSortOrder] = e.target.value.split("-");
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="type-asc">Type A-Z</option>
          <option value="type-desc">Type Z-A</option>
        </select>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAndSortedItems().map((item) => (
          <motion.div
            key={item.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
            whileHover={{ scale: 1.02 }}
            variants={itemVariants}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => {
                  const newSelection = e.target.checked
                    ? [...selectedItems, item.id]
                    : selectedItems.filter((id) => id !== item.id);
                  setSelectedItems(newSelection);
                  setShowBulkActions(newSelection.length > 0);
                }}
                className="mt-1 rounded bg-white/5 border-white/10 text-violet-500 
                  focus:ring-violet-500 focus:ring-offset-0"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Published"
                        ? "bg-green-500/20 text-green-300"
                        : item.status === "Draft"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{item.type}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handlePreview(item)}
                    className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors text-sm"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="px-3 py-1 rounded-lg bg-white/5 text-red-400 hover:bg-white/10 transition-colors text-sm ml-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add the modals */}
      <AnimatePresence>
        {showEditModal && <EditContentModal />}
        {showPreviewModal && <PreviewContentModal />}
        {showDeleteModal && (
          <DeleteConfirmationModal
            content={selectedContent}
            onConfirm={() => {
              toast.success(`Deleted ${selectedContent.title}`);
              setShowDeleteModal(false);
              setSelectedContent(null);
            }}
            onCancel={() => {
              setShowDeleteModal(false);
              setSelectedContent(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {showBulkActions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 
              rounded-full shadow-lg border border-white/10 px-6 py-3 flex items-center space-x-4"
          >
            <span className="text-white font-medium">
              {selectedItems.length} items selected
            </span>
            <div className="h-4 w-px bg-white/20" />
            <button
              onClick={() => handleBulkAction("publish")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Publish
            </button>
            <button
              onClick={() => handleBulkAction("archive")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Archive
            </button>
            <button
              onClick={() => handleBulkAction("delete")}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DeleteConfirmationModal = ({ content, onConfirm, onCancel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Delete Content</h3>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete "{content.title}"? This action cannot
          be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default ContentTab;
