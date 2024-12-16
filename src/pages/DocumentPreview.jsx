import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';
import { useDocument } from '../contexts/DocumentContext';

// Initialize mermaid with specific configuration
mermaid.initialize({
  theme: 'dark',
  securityLevel: 'loose',
  startOnLoad: true,
  fontFamily: 'monospace',
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    sidePadding: 50
  },
  pie: {
    textPosition: 0.5
  }
});

const DocumentPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentDoc, setCurrentDoc] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Get document from localStorage
    const storedDocs = JSON.parse(localStorage.getItem('documents') || '[]');
    const doc = storedDocs.find(d => d.id === parseInt(id));
    if (doc) {
      setCurrentDoc(doc);
    } else {
      navigate('/admin/content');
    }
  }, [id]);

  useEffect(() => {
    if (currentDoc?.content && contentRef.current) {
      // Set the content
      contentRef.current.innerHTML = currentDoc.content;

      // Initialize mermaid with a delay to ensure DOM is ready
      setTimeout(() => {
        try {
          mermaid.contentLoaded();
        } catch (error) {
          console.error('Mermaid initialization error:', error);
        }
      }, 100);
    }
  }, [currentDoc]);

  if (!currentDoc) {
    return (
      <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{currentDoc.title}</h1>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">{currentDoc.type}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentDoc.status === 'Published' ? 'bg-green-500/20 text-green-300' :
                currentDoc.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-blue-500/20 text-blue-300'
              }`}>
                {currentDoc.status}
              </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate(`/admin/content/edit/${id}`)}
              className="px-4 py-2 rounded-lg bg-white/5 text-gray-100 hover:bg-white/10"
            >
              Edit
            </button>
            <button
              onClick={() => navigate('/admin/content')}
              className="px-4 py-2 rounded-lg bg-white/5 text-gray-100 hover:bg-white/10"
            >
              Back
            </button>
          </div>
        </div>

        <div className="preview-content bg-white/5 rounded-lg p-8 prose prose-invert max-w-none">
          <div ref={contentRef} />
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview; 