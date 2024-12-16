import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useDocument } from '../contexts/DocumentContext';
import { DOCUMENT_TYPES } from '../components/admin/templates/documentTemplates';
import ProposalForm from '../components/admin/forms/ProposalForm';
import { generateProposalContent } from '../components/admin/templates/documentTemplates';

const EditDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDocumentById } = useDocument();
  const [document, setDocument] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const doc = getDocumentById(id);
    if (!doc) {
      const storedDocs = JSON.parse(localStorage.getItem('documents') || '[]');
      const storedDoc = storedDocs.find(d => d.id === parseInt(id));
      if (storedDoc) {
        setDocument(storedDoc);
      } else {
        navigate('/admin/content');
        return;
      }
    } else {
      setDocument(doc);
    }
  }, [id]);

  const handleFormSubmit = (data) => {
    try {
      const newContent = generateProposalContent(data);
      
      // Update document with new content and form data
      const updatedDoc = {
        ...document,
        content: newContent,
        formData: data
      };
      
      // Update in localStorage
      const storedDocs = JSON.parse(localStorage.getItem('documents') || '[]');
      const updatedDocs = storedDocs.map(doc => 
        doc.id === updatedDoc.id ? updatedDoc : doc
      );
      localStorage.setItem('documents', JSON.stringify(updatedDocs));
      
      toast.success('Document updated successfully');
      
      // Navigate to preview
      navigate(`/admin/content/preview/${id}`);
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error('Failed to generate document');
    }
  };

  if (!document) {
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
            <h1 className="text-2xl font-bold text-white mb-2">{document.title}</h1>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">{document.type}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                document.status === 'Published' ? 'bg-green-500/20 text-green-300' :
                document.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-blue-500/20 text-blue-300'
              }`}>
                {document.status}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/content')}
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
          >
            Back
          </button>
        </div>

        {document.type === DOCUMENT_TYPES.BUSINESS_PROPOSAL && (
          <ProposalForm 
            onSubmit={handleFormSubmit}
            initialData={document.formData}
          />
        )}
      </div>
    </div>
  );
};

export default EditDocument; 