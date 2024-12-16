import React, { createContext, useContext, useState } from 'react';

const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const getDocumentById = (id) => {
    return documents.find(doc => doc.id === parseInt(id));
  };

  return (
    <DocumentContext.Provider value={{
      documents,
      setDocuments,
      selectedDocument,
      setSelectedDocument,
      getDocumentById
    }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}; 